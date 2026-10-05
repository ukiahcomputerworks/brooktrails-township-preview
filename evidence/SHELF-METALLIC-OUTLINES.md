# Resources shelf outlines, 2026-10-05

All seven Resources library-shelf buttons reuse the home/contact hub-metal-edge decoration: 1.5px masked green metal, moving glint, 2px on hover/focus, pointer-events:none, aria-hidden and static reduced-motion fallback. Selected shelf retains its creek glow/background and aria-pressed; selected left-edge pseudo-element is layered above the perimeter. Existing count badges, dimensions, typography, labels, filter behavior and mobile result-scroll/focus are preserved. No other card role or Fire implementation changes.

Matrix: Home four hubs, District Desk four contact channels and Resources seven shelf buttons share the same perimeter. Actual controls receive hover/focus reinforcement; informational contact channels do not acquire fake click semantics.

Focused verify-shelf-outlines.cjs checks all seven at 390/1440px: decoration, thickness, mask, pointer passthrough, visible shimmer-frame difference, keyboard focus, exactly one aria-pressed selection, correct result headings/counts (15/22/27/19/14/16/17), selected glow layer, mobile result auto-scroll/focus, reduced motion and overflow. Phone screenshot visually inspected. Full route regression results and exact publication are recorded in COM-415 and PROJECT.md.

Cache 20261005-4. Rollback: 424f26fe8eed2928c2cb595e3dbf5239455f6e44. Fire/production/DNS unchanged; owner acceptance remains open.
