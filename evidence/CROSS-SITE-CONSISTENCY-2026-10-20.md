# Cross-site layout and styling review, 2026-10-20

Reviewed top/middle/bottom renders of all14 rendered pages (12 resident/error layouts plus2 reviewer deliverables) at1440px and390px. Spacing/overflow measurements also cover768px and320px:56 route/viewport cases before and after. The29 compatibility routes remain redirects rather than unique layouts.

## Fixed
- Services, Water and Resources bright help-panel paragraphs inherited muted gray from the shared two-column paragraph selector. Equalized component selector specificity restores dark #10241e text, with no text-size or spacing reduction. Decorative rings no longer participate in pointer hit testing.
- Resources desktop library guide used a fixed160px sticky offset while story panels used the actual header height. It now shares the measured header height plus12px clearance, eliminating approximately34px unnecessary desktop gap (about39px on the short1080px laptop).

## Verified
- All56 before/after density cases: no horizontal overflow; section padding remains at most16px.
-35 component cases across320/390/768/1080/1440px, including1080x583: three help-panel text colors, measured library offset, all16 story panels selected at each width, panel controls within the viewport, and mobile navigation open/close.
- Contact cards measured535px office versus416px golf at1440px: already content-sized, so no change needed.
- Owner-approved matching home cards, native gathering illustration proportions, metallic controls, turquoise eyebrows and separate cream reviewer-document styling retained. Inspected all route compositions and the repaired phone help panel.
- Release link guard391links, colophon14 rendered/29redirects, generator syntax and diff checks pass.

Verification tools: evidence/verify-density.cjs and evidence/audit-components.cjs. Outputs/screenshots are ignored under evidence/test-output/density. Shared CSS version20261020-14; generator emits the same stylesheet reference. No content, documents, destinations, production site, Fire implementation, DNS or forms changed.

Full final regression:43 HTML files,50 browser checks, zero static/browser errors. Covers site search, shelf filtering, panel selection, animated/reduced-motion interactions, redirects and image/layout guards. The initial run, started before the repair, reported five pre-fix cached callout-color cases; the complete final-file rerun passes all checks. Final measured dark text contrast at the darkest gradient stops:10.70:1 turquoise and9.47:1 gold.
