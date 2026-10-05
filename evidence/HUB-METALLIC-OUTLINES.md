# Clickable home-hub outlines, 2026-10-05

Owner requested a thin green metallic shimmering outline on Services, Parks & Places, District & Board and Discover Brooktrails.

One masked 1.5px decorative perimeter uses the approved seven-band green metal and moving reflection. Hover/focus strengthens it to 2px. Transparent interior preserves each hub's distinct artwork. Decorative span is aria-hidden and pointer-events:none; anchor destination, full-surface click behavior and keyboard semantics are unchanged. Reduced motion leaves a static metal edge. Owner added Discover to scope, so all four hubs share the treatment.

Verification: verify-hub-outlines.cjs tests exactly four edges, source hrefs, masking, thickness, visible screenshot differences across shimmer phases, keyboard focus, reduced-motion suppression and page overflow at 390 and 1440 px. Full site suite covers retained routes and repeated roles. Cache 20261005-1. Rollback 65b877900b6f973d2907578c8a2ed4d79edca303. Fire and production unchanged.
