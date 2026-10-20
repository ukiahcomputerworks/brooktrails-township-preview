# Golf deep-link landing below the sticky header, October 20, 2026

Owner reported that /parks/#parks-panel-golf landed with the top of the animation behind the masthead.

The page now measures the actual sticky header height and updates a shared CSS variable through ResizeObserver. Anchor scrolling and desktop sticky story panels use that height. On a panel deep link, the selected panel is activated and aligned after page load; hash changes are handled too. A short viewport that cannot fit both introductory text and the scene aligns the golf scene itself below the header. The golfer animation, phone reveal and replay remain intact. Ordinary mobile panel selection also benefits from header-aware scroll padding.

Geometry checks pass at 1080×583, 1513×618, 1440×1000, 390×844, 320×844, 1080×400 and 1440×500. In all seven cases the complete scene is below the actual header and above the viewport bottom. Checked with regular and reduced motion; the short-laptop screenshot was inspected. Repeatable check: evidence/verify-golf-landing.cjs, which supports SITE_BASE and GOLF_MOTION. Link guard 391 links, colophon 14 pages/29 redirects, JavaScript syntax and diff checks pass. CSS/script cache 20261020-9. Rollback cb1b8dcfbe21542795696952c7897f03f9b306ed.
