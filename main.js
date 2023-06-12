const colors = {
    null: 'white',
    '1': 'blue',
    '-1': 'green'
}

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
]

let board;
let turn;
let winner;

init();

function render(){
    renderBoard();
    renderMessage();
    resetButton.disabled = !winner;
  };

function init(){
    board = [
        [null, null , null],
        [null, null , null],
        [null, null , null],
    ];
    turn = 1;
    winner = null;
    render();
}

