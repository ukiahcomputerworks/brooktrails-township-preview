"""Fail a release on legacy-site handoffs, placeholder links or missing local targets."""
import json
import re
from html.parser import HTMLParser
from pathlib import Path
import subprocess
from urllib.parse import urlsplit, unquote

class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.ids = set()
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get('id'):
            self.ids.add(attrs['id'])
        if tag == 'a' and not (attrs.get('name') or (attrs.get('id') and 'href' not in attrs)):
            self.links.append(attrs.get('href', ''))

def check(root):
    root = Path(root).resolve()
    config = json.loads((root / 'site-link-policy.json').read_text(encoding='utf-8'))
    blocked = set(config['blockedLegacyHosts'])
    names = subprocess.check_output(['git', '-C', str(root), 'ls-files', '--cached', '--others', '--exclude-standard', '*.html'], text=True).splitlines()
    failures = []
    checked = 0
    for name in sorted(set(names)):
        if any(part in {'source', 'scripts', '.deps', 'node_modules', 'templates'} for part in Path(name).parts):
            continue
        page = root / name
        parser = Links()
        parser.feed(page.read_text(encoding='utf-8-sig'))
        if not name.startswith('deliverables/') and '<meta http-equiv="refresh"' not in page.read_text(encoding='utf-8-sig'):
            visible = re.sub(r'<[^>]+>', ' ', page.read_text(encoding='utf-8-sig')).lower()
            for phrase in ['retained source archive', 'nothing disappears in the redesign', 'content parity checks', 'source snapshot:']:
                if phrase in visible:
                    failures.append(f'{name}: public migration scaffolding: {phrase}')
        for href in parser.links:
            if not name.startswith('deliverables/') and re.search(r'(?:^|/)archive(?:/|#|$)', urlsplit(href).path):
                failures.append(f'{name}: public archive handoff {href}')
            checked += 1
            url = urlsplit(href)
            if url.hostname and url.hostname.lower() in blocked and href not in config.get('approvedExternalActions', {}).get(name, []):
                failures.append(f'{name}: forbidden legacy-site link {href}')
            elif not href.strip() or href.strip() == '#' or url.scheme in {'javascript', 'data'}:
                failures.append(f'{name}: placeholder link {href!r}')
            elif not url.scheme and not url.netloc:
                target = (page.parent / unquote(url.path)).resolve() if url.path else page
                if target.is_dir():
                    target /= 'index.html'
                if not target.is_file():
                    failures.append(f'{name}: missing local target {href}')
                elif url.fragment:
                    dest = parser
                    if target != page:
                        dest = Links()
                        dest.feed(target.read_text(encoding='utf-8-sig'))
                    if unquote(url.fragment) not in dest.ids:
                        failures.append(f'{name}: missing anchor {href}')
    index_path = root / 'search-index.json'
    if index_path.exists():
        for entry in json.loads(index_path.read_text(encoding='utf-8')):
            if re.search(r'(?:^|/)archive(?:/|#|$)', entry.get('href', '')):
                failures.append('search-index.json: public archive handoff')
    raw_snapshots = subprocess.check_output(['git', '-C', str(root), 'ls-files', 'evidence/source-content-*'], text=True).strip()
    if raw_snapshots:
        failures.append('Raw migration snapshots must remain outside the published tree')
    if failures:
        raise SystemExit('Release link check failed:\n' + '\n'.join(failures))
    print(f'PASS {checked} links: no legacy-site handoffs, placeholders or missing local targets')
    return checked

if __name__ == '__main__':
    check(Path(__file__).resolve().parents[1])
