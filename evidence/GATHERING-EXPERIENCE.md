# Gathering experience, 2026-10-02

## Draw, hook, reward

Rental typography correction, 2026-10-04: Rent The uses the same display font, size, weight, line height, tracking and case as its venue name. Shared selector applies to both venues and the compact-laptop variant. verify-gathering.cjs compares computed typography for both elements across both venues at 390, 1080 and 1440 px. Cache 20261004-6; rollback bd7baacd079f820d3a2c206d684cb74a250280b2.

The former three numbered instruction boxes were replaced with **Open doors or open sky?** Two setting buttons switch a symbolic forest scene between the Community Center and Ohl Redwood Grove. The Center doors open; the Grove string lights glow. The selected setting reveals a single metallic emerald application button with its exact captured PDF. Staff confirmation follows as the one shared next step, with a context-aware District Desk prompt.

These original inline SVG illustrations are explicitly labeled as illustrations, not photographs or verified depictions of actual facilities. No capacity, amenity, fee, availability, or booking claim is invented. No form submission or reservation backend is created. Original PDF records remain unchanged.

## Component matrix and intentional variant

| Role | Reference | Gathering variant |
|---|---|---|
| Kicker, heading, introduction | Parks shared story panel | Existing classes retained, shorter copy |
| Setting choice | Shared button/focus conventions | Two native buttons, 44 px minimum, pressed state |
| Graphic | Parks scene stage | Code-native illustrated venue selector, no remote assets |
| Download action | Exact record link | One full-surface metallic emerald anchor for the selected PDF |
| Staff handoff | District Desk utility | Contextual gathering prompt, not an additional hub |
| Motion | Reduced-motion site preference | Selection-triggered doors/lights, disabled under reduced motion |

`.gather-*` styles are scoped to the new component. All generated routes receive cache key `20261004-3`. Existing route-by-component typography, navigation, hero fit, and field-stage fit checks remain in the full browser suite. The new tests exercise both venues, exclusive ticket visibility, exact PDF hrefs, 44 px controls, keyboard focus, and the reservation boundary. `verify-gathering.cjs` captures both states at 390×844, 1080×583, and 1440×1000 and checks reduced-motion transitions.

No Fire implementation or production-site change is part of this release. Owner acceptance remains open under COM-415.
