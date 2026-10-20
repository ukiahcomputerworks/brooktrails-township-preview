# Site-wide compact layout, October 20, 2026

Owner request: eliminate wasted space on every Township page, desktop and mobile.

## Shared component profile

Shell: maximum 88rem, desktop/tablet side inset 12px, phone inset 8px. Sections: 16px vertical, 12px on phones. Layout gaps: 16px/12px; repeated utility rows: 8px vertical padding and compact gaps. Cards and story stages use content height, with no filler minimum or auto-pushed actions. Body typography, approved colors, focus, full Board group composition, animations, search, and document content are retained. Phone primary controls retain 44px minimum targets.

Home imagery is positioned within the content-sized hero; supporting figures retain aspect ratio. The landscape imagery and animated scenes retain their visual role. Proposal and migration-review pages use the same compact spacing principles in their standalone styles.

## Route and repeated-component matrix

All 14 rendered pages at 1440, 768, 390 and 320px passed overflow and 16px maximum section-padding checks (56 route/viewport combinations). Per-route title/body/button computed styles, component heights, section dimensions, full-page desktop/390/320 screenshots and before/after metrics are recorded by evidence/verify-density.cjs in the local ignored test-output/density directory. The 11 resident/reviewer routes share styles.css; two standalone reviewer pages keep their intentional paper/serif profiles; 404 uses the shared system. All 29 immediate redirects retain their destinations.

| Route | Desktop before / after px | Phone before / after px |
|---|---:|---:|
| home | 3754 / 2609 | 4624 / 3670 |
| services/ | 2217 / 1634 | 2589 / 2214 |
| water/ | 3918 / 2884 | 5954 / 5300 |
| parks/ | 2544 / 1882 | 3556 / 2876 |
| planning/ | 4548 / 3455 | 6501 / 5517 |
| moving/ | 3132 / 2421 | 4637 / 3951 |
| government/ | 2531 / 2101 | 3407 / 3098 |
| history/ | 2899 / 2234 | 4313 / 3801 |
| resources/ | 2917 / 2226 | 3426 / 2945 |
| archive/ | 4128 / 3465 | 4635 / 3930 |
| contact/ | 1753 / 1338 | 2490 / 2122 |
| 404.html | 1093 / 1000 | 1170 / 1000 |
| deliverables/town-manager-proposal.html | 6781 / 4974 | 10522 / 8646 |
| deliverables/content-migration-review.html | 3591 / 2803 | 9303 / 7550 |

## Release checks

All 43 HTML files and 50 local browser checks passed with zero static or browser errors, including all hub selections, autocomplete, library filtering, Board portraits, deep links, golf timing/replay and reduced motion.

Static link guard: 380 links pass; an injected old-site fallback was rejected. Two existing district payment-access links remain deliberate external actions, not payment-delivery evidence. Obsolete current-site footer links and archived source handoffs were removed; captured text remains preserved. The obsolete golf-course page link now uses the verified operator course page, https://www.brooktrailsgolf.com/course/. No contact details were revised.

Colophon: all 14 rendered pages and 29 redirects pass. Web-development system validator passes. No new content, routes, private data, forms or dependencies were introduced.

Scope: authorized noindex Township GitHub Pages preview. Prior verified rollback: ccfbccdd4acb1aa1c141283521b423e8a1517912. District production and separate Fire ownership remain separately governed. Owner acceptance remains pending.
