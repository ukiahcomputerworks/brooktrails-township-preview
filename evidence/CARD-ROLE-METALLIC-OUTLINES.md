# Clickable card-role audit, 2026-10-05

Owner requested Board-member row outlines and a Township-wide search for comparable clickable cards missing the green metallic perimeter. Reused the existing 1.5px masked seven-band green edge, moving glint, 2px hover/focus reinforcement and static reduced-motion fallback. A shared build-time decorator adds decoration to established card roles rather than targeting every anchor. Core decoration does not require JavaScript.

## Added component matrix

| Route | Added outlines | Roles |
| --- | ---: | --- |
| Home | 5 | Three common-tool tiles, two guided journeys |
| Water | 7 | Resident utility/payment/document tiles |
| Parks | 9 | Four experience tabs, two venue choices, three boxed stewardship record links |
| District & Board | 18 | Seven civic tabs, five Board-member rows, three finance record links, three operations destination cards |
| Discover | 5 | Story selector tabs |
| Services, Planning, Moving, Resources, Archive, Contact | 0 new | No additional matching boxed card role; existing Resources/Contact outlines retained |

44 new outlined components, including five Board rows. Previously outlined four Home hubs, four Contact channels and seven Resources shelves remain. Plain word links, navigation/search results, rustic trail-sign links, native archive disclosures, informational process/stat panels and full metallic buttons remain intentionally distinct. The proposed long document-list redesign was not authorized by this request and is not implemented here.

## Interaction and layering

Decorative elements are aria-hidden and pointer-events:none. Actual anchors/buttons retain their destinations, labels, click handlers, focus, selection state and dimensions. Board row outlines do not isolate or clip portrait pop-ups; portraits retain z-index8 above perimeter z-index4. Story active left bars retain z-index5. Venue selection keeps its original background/gold top inset. No Fire or production changes.

## Verification

Full local 43-HTML/50-browser regression passed with zero static/browser errors. Final focused role audit spans all11 main routes at390/1440: exactly one direct decorative edge per marked card, correct mask/thickness, pointer passthrough, exclusion guards, no horizontal overflow and reduced motion. All five Board portrait toggles still open; visible shimmer-frame differences and phone/desktop Board screenshots verified. Venue selection still works. Reproducible matrix: evidence/test-output/card-outline-matrix.json, verify-card-role-outlines.cjs. Final live evidence and exact deployment are recorded in COM-415 and coordination PROJECT.md.

Cache20261005-5; rollback f9da4f5db8910e70da019e137c3335ec9c0861c3.
