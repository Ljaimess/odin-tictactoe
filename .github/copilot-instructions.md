# Copilot / AI Agent Instructions for odin-tictactoe

Purpose
- Small client-side Tic-Tac-Toe implemented with vanilla HTML/CSS/JS. No build step; open `index.html` in a browser to run.

Quick start
- Open [index.html](index.html) in a browser (no server needed).
- Use browser DevTools console to run and debug `script.js` behaviors.

Big picture
- Single-page, client-side app. UI in [index.html](index.html), styles in [style.css](style.css), logic in [script.js](script.js).
- State model: a flat 9-element array (grid) represents the board (indices 0–8).
- UI mapping: DOM elements with ids `block-0` .. `block-8` show cells; `status` shows messages.

Key modules & patterns (in `script.js`)
- Gameboard: IIFE-style module that holds `grid`, exposes `getGrid()` and `resetGrid()`.
  - Example: `let grid = ["", "", "", "", "", "", "", "", ""];`
- Player: factory function pattern returning `{ name, marker }`.
  - Markers stored as lowercase (`"x"`, `"o"`) and displayed uppercased by `render()`.
- gameLogic: IIFE-style module that manages `currentPlayer`, `playTurn(index)`, `checkWinner()` and `resetGame()`.
  - Win conditions are defined as an array of index triples (rows/cols/diagonals).

Discoveries / Gotchas to be aware of
- `script.js` contains a few incomplete/buggy areas agents should not silently hide:
  - The file defines Gameboard and gameLogic as arrow functions returning objects but currently lacks the trailing `()` to invoke the IIFE. Ensure those modules are invoked (e.g., `const Gameboard = (function(){...})();`).
  - `gameLogic` returns `getCurrentPlayer` in its public API but that function is not implemented. Either implement or correct the API.
  - The DOMContentLoaded event listener has an empty loop body — event wiring for cell clicks is incomplete. Add click listeners that call `gameLogic.playTurn(i)` and then `render()` / `displayStatus()`.

Code-change guidance
- Keep the existing patterns: prefer IIFE modules and the Player factory rather than converting to classes unless requested.
- Make minimal, well-scoped edits: fix module invocation, implement missing `getCurrentPlayer`, and complete DOM event wiring first.
- When updating markers or grid logic, preserve that markers are stored lowercase and are `toUpperCase()`d in `render()`.

Debugging and verification
- Manual: open [index.html](index.html), click cells, watch console for `console.log` messages and the `status` element updates.
- Quick checks:
  - Confirm `Gameboard.getGrid()` returns an array of length 9.
  - Confirm `playTurn(i)` writes to the grid only when cell is empty.
  - Confirm `checkWinner()` returns the winning player's name or `draw`.

Files to examine when making changes
- [script.js](script.js) — game logic and UI wiring
- [index.html](index.html) — DOM ids: `block-0`..`block-8`, `status`
- [style.css](style.css) — presentation only

If you need to extend functionality
- Keep UI and logic separated: modify `script.js` game modules and let `render()` handle DOM updates.
- Add small unit-like checks by exposing pure functions (e.g., `checkWinner(grid)`) to make logic easier to test.

When in doubt
- Run the app in-browser and reproduce the issue manually before changing logic.
- Mention discovered runtime errors and the exact DOM element or function name you changed in PR descriptions.

Files created: `.github/copilot-instructions.md`

Created by: repository analysis — please review and tell me any missing specifics to include.
