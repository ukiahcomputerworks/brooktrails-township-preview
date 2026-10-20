# Independently timed task-card shimmer, October 20, 2026

Owner requested shimmering effects at different intervals on all five pictured homepage task cards: Pay water bill, Search records and forms, District Desk, Resident project path and Prospective resident path.

Shared CSS adds a restrained transparent diagonal light sweep. Each card has a distinct repeat duration (7.1, 8.3, 9.7, 10.9 and 12.1 seconds) and a separate phase offset. Existing visitor-card metallic borders inherit the card timing. The overlay ignores pointer events, remains within card bounds and changes no dimensions or destinations. Reduced-motion preferences disable all five sweeps. Utility JPGs remain unchanged.

Local runtime checks at 320/390/1440px verified all five animations run with distinct durations, background positions advance, overlays ignore input, no overflow and reduced-motion suppression. Desktop screenshots of both groups at an active sheen phase were inspected. Link guard 393 links, colophon 14 rendered pages/29 redirects and diff checks pass. Cache key 20261020-6. Rollback bf4d5951726d82083fdf62a748c6d88cc48f71c0. Township preview only.
