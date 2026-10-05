# Home landscape mobile density, 2026-10-05

Owner requested removal of excessive negative space in Everything starts with this place and its 2,500/60/47 statistic blocks.

Below 64rem: section padding drops to 2rem, introduction/stat gap to 1rem, and three tall blocks become compact number-plus-caption rows with .5rem gaps. No copy or number changes. Captions increase from .78rem to .9rem; desktop statistic layout is preserved while shared section padding is tightened in the subsequent whole-site pass.

Measured at 390px: previous live section 885.92px, new local section 545.58px, reduction 340.34px (38.4%). Individual rows drop from 132.03px to 66.31px. Screenshots inspected at phone/tablet/desktop. Focused checks confirm statistics, density and no overflow at 390/768/1440px; full regression covers all retained routes.

Cache 20261005-2; rollback 71ce91885f573e272ff88930876df77d03d2ee57. All four metallic hub outlines retained. Fire/production unchanged.
