const Gameboard = (() => {
    let grid = ["", "", "", "", "", "", "", "", ""];

    const getGrid = () => [...grid];
    
    const setCell = (index, marker) => {
        if (grid[index] === "") {
            grid[index] = marker;
            return true;
        }
        return false;
    };

    const getCell = (index) => grid[index];

    const reset = () => {
        grid = ["", "", "", "", "", "", "", "", ""];
    };

    const isCellEmpty = (index) => grid[index] === "";

    const isBoardFull = () => !grid.includes("");

    return { getGrid, setCell, getCell, reset, isCellEmpty, isBoardFull };
})();

const Player = (name, marker) => {
    return { name, marker };
};

const GameController = (() => {
    let player1;
    let player2;
    let currentPlayer;
    let gameOver = false;
    let winner = null;

    const init = (name1 = "Player 1", name2 = "Player 2") => {
        player1 = Player(name1, "x");
        player2 = Player(name2, "o");
        currentPlayer = player1;
        gameOver = false;
        winner = null;
        Gameboard.reset();
    };

    const getCurrentPlayer = () => currentPlayer;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const checkWinner = () => {
        const grid = Gameboard.getGrid();
        
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let condition of winConditions) {
            const [a, b, c] = condition;
            if (grid[a] !== "" && grid[a] === grid[b] && grid[a] === grid[c]) {
                return currentPlayer;
            }
        }

        if (Gameboard.isBoardFull()) {
            return "draw";
        }

        return null;
    };

    const playRound = (cellIndex) => {
        if (gameOver) {
            console.log("Game is already over! Reset to play again.");
            return;
        }

        if (!Gameboard.setCell(cellIndex, currentPlayer.marker)) {
            console.log("Cell already taken! Choose another.");
            return;
        }

        const result = checkWinner();
        if (result) {
            gameOver = true;
            winner = result;
            if (result === "draw") {
                console.log("It's a draw!");
            } else {
                console.log(`${result.name} wins!`);
            }
            return;
        }

        switchPlayer();
        console.log(`${currentPlayer.name}'s turn (${currentPlayer.marker.toUpperCase()})`);
    };

    const isGameOver = () => gameOver;

    const getWinner = () => winner;

    const reset = () => {
        const stored1 = localStorage.getItem("player1Name") || "Player 1";
        const stored2 = localStorage.getItem("player2Name") || "Player 2";
        init(stored1, stored2);
    };

    return { 
        init, 
        playRound, 
        getCurrentPlayer, 
        isGameOver, 
        getWinner, 
        reset 
    };
})();

const DisplayController = (() => {
    let cellElements;
    let statusElement;
    let resetButton;

    const render = () => {
        const grid = Gameboard.getGrid();
        cellElements.forEach((cell, index) => {
            cell.textContent = grid[index].toUpperCase();
        });
    };

    const updateStatus = (message) => {
        statusElement.textContent = message;
    };

    const clearBoard = () => {
        cellElements.forEach(cell => {
            cell.textContent = "";
        });
    };

    const addCellClickListeners = () => {
        cellElements.forEach((cell, index) => {
            cell.addEventListener("click", () => {
                GameController.playRound(index);
                render();
                updateGameStatus();
            });
        });
    };

    const addResetButtonListener = () => {
        resetButton.addEventListener("click", () => {
            GameController.reset();
            clearBoard();
            render();
            updateGameStatus();
        });
    };

    const addStartButtonListener = () => {
        const startButton = document.getElementById("start-button");
        const input1 = document.getElementById("player1-name");
        const input2 = document.getElementById("player2-name");
        if (!startButton) return;
        startButton.addEventListener("click", () => {
            const name1 = (input1 && input1.value.trim()) || "Player 1";
            const name2 = (input2 && input2.value.trim()) || "Player 2";
            localStorage.setItem("player1Name", name1);
            localStorage.setItem("player2Name", name2);
            GameController.init(name1, name2);
            render();
            updateGameStatus();
        });
    };

    const updateGameStatus = () => {
        if (GameController.isGameOver()) {
            const winner = GameController.getWinner();
            if (winner === "draw") {
                updateStatus("It's a Draw!");
            } else {
                updateStatus(`${winner.name} (${winner.marker.toUpperCase()}) Wins!`);
            }
        } else {
            const currentPlayer = GameController.getCurrentPlayer();
            updateStatus(`${currentPlayer.name}'s Turn (${currentPlayer.marker.toUpperCase()})`);
        }
    };

    const init = () => {
        cellElements = document.querySelectorAll(".block");
        statusElement = document.getElementById("player-turn");
        resetButton = document.getElementById("reset-button");
        const input1 = document.getElementById("player1-name");
        const input2 = document.getElementById("player2-name");
        const stored1 = localStorage.getItem("player1Name") || "Player 1";
        const stored2 = localStorage.getItem("player2Name") || "Player 2";
        if (input1) input1.value = stored1;
        if (input2) input2.value = stored2;

        addCellClickListeners();
        addResetButtonListener();
        addStartButtonListener();
        render();
        updateGameStatus();
    };

    return { init, render, updateStatus };
})();

document.addEventListener("DOMContentLoaded", () => {
    const stored1 = localStorage.getItem("player1Name") || "Player 1";
    const stored2 = localStorage.getItem("player2Name") || "Player 2";
    GameController.init(stored1, stored2);
    DisplayController.init();
});