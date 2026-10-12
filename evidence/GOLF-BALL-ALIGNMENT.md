# Golf ball alignment, October 12, 2026

Scope: Township preview only. The owner identified the ball floating above/left of the clubhead.

Implementation: anchor ball and flight origin to the address sprite's dimensions instead of unrelated rem offsets. Its center is immediately to the right of the clubhead, at the same height. Draw the ball behind the golfer and reduce its glow. Preserve pause, backswing, impact, follow-through, replay, phone link and reduced-motion handling. No image alteration or Fire website changes.

Focused verification: evidence/verify-golf-ball.cjs passes at widths 390, 768, 1080, 1440. Normalized ball coordinates are within 0.005 of 1.015 across and 0.9 down; replay has no origin jump and pages have no horizontal overflow. Phone/desktop screenshots in ignored evidence/test-output were visually checked. Full site regression and release results are recorded in PROJECT.md and COM-415.

Prior source: ec6756a58b5c6a4c206352056d414d93f4164358. Its October 5 deployment completed unsuccessfully: build/report succeeded, deploy was cancelled. Prior verified deployment: beba22f7971946d5d87d2f0ca3fb823198907bf3. The current release includes the previously pending document-list improvements without claiming they had already deployed.
