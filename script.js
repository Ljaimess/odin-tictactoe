const Gameboard = (() => {
    let grid = ["", "", "", "", "", "", "", "", ""];
    const getGrid = () => grid;

    const resetGrid = () => {
        grid = ["", "", "", "", "", "", "", "", ""];
    };
    return { getGrid, resetGrid };
});


const Player = (name, marker) => {
    return { name, marker };
};

console.log(Player)

const gameLogic = (() => {
    const player1 = Player("Player 1", "x");
    const player2 = Player("player 2", "o");
    const grid = Gameboard.getGrid();
    let currentPlayer = player1;

    const setBlock = (index, value) => {
        if (grid[index] === "") {
            grid[index] = value;
            console.log("Cell is already taken! Choose another.");
            return;
        }
    };

    const changePlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const playTurn = (index) => {
        setBlock(index, currentPlayer.marker);
        const winner = checkWinner();
        if (winner) {
            if (winner === "draw") {
                console.log("It's a draw!");
            } else {
                console.log(`${winner.name} wins!`);
            }
            Gameboard.resetGrid();
        } else {
            changePlayer();
            console.log(`${currentPlayer.name}'s turn`);
        }
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

        for (const condition of winConditions) {
            const [a, b, c] = condition;
            if (grid[a] && grid[a] === grid[b] && grid[a] === grid[c]) {
                return currentPlayer;
            }
        };

        if (!grid.includes("")) {
            return "draw";
        }
        return null;
    };
    return { playTurn };
});
