# District Desk contact outlines, 2026-10-05

Owner requested the same green-metal perimeter as the home hubs around Call, Email, Visit/Mail and Fax. Each now has one aria-hidden hub-metal-edge decoration using the existing 1.5px masked seven-band green gradient and 5.8s glint. Interiors, dimensions, labels and contact details are retained. Call and Email remain the same tel/mailto anchors; Visit/Mail and Fax remain non-interactive information blocks. Link hover/focus strengthens the edge to 2px; keyboard focus has a visible offset outline. Decorative edges ignore pointer events and reduced-motion freezes the glint.

Matrix: Home Services/Parks/Board/Discover and District Desk Call/Email/Visit/Fax all share hub-metal-edge. Only actual anchors receive interactive hover/focus treatment. All other page elements and Fire implementation are unchanged.

Focused verify-contact-outlines.cjs covers all four cards at 390/1440px: exact href/non-link semantics, decorative aria-hidden, 1.5px mask, pointer passthrough, different visible paused shimmer frames, keyboard focus, informational cursor/tabindex, reduced motion and no horizontal overflow. Phone screenshot visually inspected. Full suite validates all retained routes and interactions. Final release results are recorded in COM-415 and coordination PROJECT.md.

Cache 20261005-3. Rollback: fcb6282d21fe60ea9f7ee5c5a3f81c122b9c33e0. No production or DNS changes.
