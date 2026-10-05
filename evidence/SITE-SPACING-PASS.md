# Township spacing pass — 2026-10-05

Scope: all 11 main Township routes; shared styles also cover retained catalog/recovery pages. Fire implementation and production are excluded. No content, destinations, text sizes or tap-target sizes removed/reduced.

## Changes

- Shared sections: 2–4.5rem padding instead of 4.5–8rem.
- Inner-page heroes: 2–3.5rem instead of 4.5–7rem; remove last-paragraph bottom margin.
- Intro gap .6rem and bottom margin 1.25rem instead of 1.2/2.5rem.
- Remove fixed 34/37rem story-stage and tall desktop hero-grid minimum heights. Actual content/artwork now determines height; compact-laptop composition retained.
- Home hub gutters 1.25–2.5rem instead of 2.5–6rem; retain all four green-metal perimeters.
- Mobile home hero bottom padding 3rem instead of 6rem. Landscape stats become compact number/caption rows; original values and copy retained.
- History/landscape bands share tighter padding; footer top/bottom reduce to 2.5/2rem.
- Print and reduced-motion behavior retained; animations/artwork are not resized by this pass.

## Measured default-page heights

Baseline is live commit 71ce918; after is local generated output, Chrome, same 390×1000/1440×1000 viewports. Values are total document pixels, including footer. They represent default states, not every expanded panel.

| Route | Phone before → after | Desktop before → after |
| --- | --- | --- |
| Home | 5338 → 4614 | 4249 → 3754 |
| Services | 2952 → 2578 | 2643 → 2217 |
| Water | 6422 → 5758 | 4650 → 3888 |
| Parks | 3945 → 3546 | 3040 → 2544 |
| Planning | 6674 → 6135 | 4981 → 4344 |
| Moving | 5064 → 4626 | 3670 → 3132 |
| District & Board | 3801 → 3396 | 2957 → 2531 |
| Discover | 4764 → 4302 | 3340 → 2899 |
| Resources | 4322 → 3995 | 3323 → 2917 |
| Archive | 4854 → 4624 | 4421 → 4128 |
| District Desk | 2709 → 2480 | 2047 → 1753 |

The reported District & Board boundary now has 32px hero-bottom/section-top padding each, down from 72px each. Hero height falls from 452 to 354px; the whole phone page saves 405px. Home saves 724px, including 340px within the landscape section.

## Verification and release

`verify-site-spacing.cjs` captures all 11 main routes at phone/desktop sizes, measures padding and page heights, checks horizontal overflow and fixed empty mobile stages. `verify-landscape-density.cjs` checks retained statistics and compact rows at phone/tablet/desktop sizes. `scripts/test-site.mjs` covers 43 HTML routes and 50 browser cases including compact laptops, selected panels, navigation, search, animations and reduced motion. Reports/screenshots are reproducible in ignored evidence/test-output directories.

Cache 20261005-2. Rollback: 71ce91885f573e272ff88930876df77d03d2ee57. Exact deployment, successful run and final live evidence are recorded in COM-415 and coordination PROJECT.md after publication. Owner acceptance remains open.
