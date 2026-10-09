# Rampart (browser) — orientation

Browser clone of the 1990 arcade game Rampart. Turn-based, mouse-driven, vs Computer or 2 players on one mouse. Original art and sound only; no arcade assets.

## The product
One self-contained file, `index.html` (canvas + vanilla JS, no build step, no dependencies). It must keep working by double-click from disk. Ask before adding dependencies, a build step or changing the controls.

## Where things live (load only what the task needs)
| Need | File |
|---|---|
| How the game is supposed to behave, tuning numbers | `docs/rules.md` (single source of truth; update it before changing the code) |
| What to work on next | `docs/backlog.md` |
| What testing found, newest first | `docs/playtest-log.md` |
| Run a full automated game | `tools/playthrough.js` |

## Working loop
1. **Design:** pick one backlog item (or the user's request), settle the rule change in `docs/rules.md`.
2. **Build:** smallest edit to `index.html`; keep its sections (constants, state, audio, map, enclosure, pieces, flow, battle, AI, update, drawing, HUD, input, loop).
3. **Check:** run the playthrough, read the console, screenshot the changed phase.
4. **Log:** add a dated entry to `docs/playtest-log.md`, tick or add backlog items.
5. Show the user and wait for feedback before the next item.

## Testing notes
- Serve with `cd ~/Developer/rampart-web && python3 -m http.server 8765`, then open `http://localhost:8765/index.html`. The browser pane renders file:// pages as static snapshots, so scripts won't run there.
- The pane only runs animation frames while taking screenshots. `tools/playthrough.js` steps time with `window.__fn.update(dt)` (exposed on purpose), so don't wait in real time.
- Set `window.__opts = {diff:2, stopRound:4}` before running it to change difficulty or stop mid-game for a screenshot.
- Stop the server when finished.
