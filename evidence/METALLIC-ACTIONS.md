# Metallic emerald actions — 2026-10-04

Expansion: the shared .button role, including light/ghost/outline/replay variants, now uses this material across primary routes. The golfer's phone reveal also uses it while retaining absolute placement and its original reveal animation. Navigation, text links, choice rails, rustic trail sign and golfer sprite are excluded. Cache 20261004-4; rollback eec676307041028a52f8cdc82743f65777d12187. Owner also requested removal of the Township District Desk sensitive-information callout; removed only that callout, not Fire-project privacy boundaries. Focused tests check shared button material across ten primary routes, golf placement, visibly changing shimmer frames, reduced-motion and absence of the callout.

Owner direction: match Alpha After Dark's metallic appeal in green on the gathering application and District Desk course telephone tile.

Implemented one clickable selected venue ticket with the exact original PDF, plus the existing course tap-to-call link in the shared emerald treatment. No nested interactive elements or online-submission claim. Scope is Township only; the golfer's in-scene reveal is unchanged.

Owner correction: the previous dark grain was not sufficiently metallic or shimmering. Replaced it with Alpha's actual seven-band 105-degree metal recipe translated into bright green, plus the same 88-percent white sweep, dark ink lettering and bevel. verify-metallic.cjs now compares rendered animation frames, not just an animation-name property, to prove visible motion.

Verification: build, cross-route browser suite, and focused desktop/phone checks for gradients, visibly different sweep frames, preserved destinations, no nested actions, and reduced-motion suppression. Screenshots are in ignored test-output folders. Cache key: 20261004-3. Rollback: 413b000189ccd689a080ed57587f2f744ab2798b.
