const Gameboard = (() => {
    let grid = ["", "", "", "", "", "", "", "", ""];
    const getGrid = () => grid;

    const resetGrid = () => {
        grid = ["", "", "", "", "", "", "", "", ""];
    };
    return { getGrid, setBlock, resetGrid };
});


const Player = (name, marker) => {
    return { name, marker };
};

console.log(Player)

const gameLogic = (() => {
    const player1 = Player("Player 1", "x");
    const player2 = Player("player 2", "o");
    let currentPlayer = player1;

    const changePlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const playTurn = (index) => {
        //put user name and x or o in the grid/ object
        //
    }
}); 