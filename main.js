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

const messageEl = document.querySelector('h1');
const resetButton = document.querySelector('button');

document.getElementById('board').addEventListener('click', playerChoice);
resetButton.addEventListener('click', init);

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

function renderBoard(){
    board.forEach(function(sqVal, idx){
        const squareCell = document.getElementById(`sq${idx}`);
        squareCell.style.backgroundColor = colors[sqVal];
    });
};

function renderMessage(){
    if (winner === 'T') {
        messageEl.innerText = "Tied";
    } else if (winner) {
        messageEl.innerHTML = `<span style="color: ${colors[winner]}">${colors[winner].toUpperCase()}</span> is the winner!`;
    } else {
        messageEl.innerHTML = `<span style="color: ${colors[turn]}">${colors[turn].toUpperCase()}</span>'s turn`;
    };
};

function playerChoice(evt) {
    const target = evt.target;
    const cells = Array.from(document.querySelectorAll('#board > div'));
    const idx = cells.indexOf(target);
    if (
        winner || board[idx] || typeof(idx) !== 'number'
    )
    return;
    board[idx] = turn;
    turn *= -1;
    winner = getWinner();
    render();
};

function getWinner() {
    for (let i=0; i< winningCombinations.length; i++){
        if (Math.abs(board[winningCombinations[i][0]] + board[winningCombinations[i][1]] + board[winningCombinations[i][2]]) === 3)
        return board[winningCombinations[i][0]];
    }
    if (board.includes(null)) return null;
    return 'T';
}