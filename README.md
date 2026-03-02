# odin-tictactoe

**Overview:**

- **Project:** A vanilla JavaScript implementation of Tic‑Tac‑Toe built for The Odin Project curriculum.
- **Files:** The app is single‑page and uses [index.html](index.html), [style.css](style.css), and [script.js](script.js).

**What I built:**

- A working Tic‑Tac‑Toe game playable in the browser.
- Game logic implemented first (console‑friendly), then a separate display controller updates the DOM.
- Players take turns clicking cells; the game prevents playing on occupied cells, detects wins and draws, and provides a reset button.

**Architecture & Patterns used:**

- **Gameboard (IIFE module):** stores the 9‑cell board array and exposes methods to read, write, reset, and query the board.
- **Player factory:** creates player objects with `name` and `marker` properties.
- **GameController (IIFE module):** contains the game flow: turn management, win/draw checks, and overall game state.
- **DisplayController (IIFE module):** handles all DOM updates and event wiring (rendering the board, updating status text, and wiring the reset button).

**How to run:**

1. Open `index.html` in your browser (no build step required).
2. Click any empty cell to place the current player's marker.
3. Use the `Reset Game` button to start a new game.

**Key lessons / things I learned:**

- How to separate game logic from display logic (single responsibility).
- How to structure code with factory functions and modules (IIFE) to reduce globals.
- Implementing win/draw detection for a 3×3 board and preventing illegal moves.

**Next improvements (optional):**

- Add player name inputs and persist names between games.
- Implement a simple AI opponent (minimax or heuristic).
- Add score tracking across rounds.
- Add keyboard accessibility and improved styling.

**Notes:**

- The project intentionally keeps logic separate from DOM manipulation so the game can be tested in the console first.