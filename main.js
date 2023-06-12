const colors = {
    null: 'white',
    '1': 'blue',
    '-1': 'green'
}

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

