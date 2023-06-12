const colors = {
    null: 'white',
    '1': 'blue',
    '-1': 'green'
};

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
];

let board;
let turn;
let winner;

const messageEl = document.querySelector('h1');
const resetButton = document.querySelector('button');

document.getElementById('board').addEventListener('click', playerChoice);
resetButton.addEventListener('click', init);

init();

function render() {
    renderBoard();
    renderMessage();
    resetButton.disabled = !winner;
}

function init() {
    board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    turn = 1;
    winner = null;
    render();
}

function renderBoard() {
    board.forEach(function(row, rowIndex) {
      row.forEach(function(cell, colIndex) {
        const squareCell = document.getElementById(`sq${rowIndex * 3 + colIndex}`);
        squareCell.style.backgroundColor = colors.null;
        squareCell.innerHTML = cell === 1 ? `<span class="symbol player1">X</span>` : cell === -1 ? `<span class="symbol player2">O</span>` : '';
      });
    });
  }

function renderMessage() {
    if (winner === 'T') {
        messageEl.innerText = "Tied";
    } else if (winner) {
        messageEl.innerHTML = `<span style="color: ${colors[winner]}">${colors[winner].toUpperCase()}</span> is the winner!`;
    } else {
        messageEl.innerHTML = `<span style="color: ${colors[turn]}">${colors[turn].toUpperCase()}</span>'s turn`;
    }
}

function playerChoice(evt) {
    const target = evt.target;
    const cells = Array.from(document.querySelectorAll('#board > div'));
    const idx = cells.indexOf(target);
    if (winner || board[Math.floor(idx / 3)][idx % 3] || typeof idx !== 'number') {
        return;
    }
    board[Math.floor(idx / 3)][idx % 3] = turn;
    turn *= -1;
    winner = getWinner();
    render();
}

function getWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (
            board[Math.floor(a / 3)][a % 3] &&
            board[Math.floor(a / 3)][a % 3] === board[Math.floor(b / 3)][b % 3] &&
            board[Math.floor(a / 3)][a % 3] === board[Math.floor(c / 3)][c % 3]
        ) {
            return board[Math.floor(a / 3)][a % 3];
        }
    }
    if (board.flat().includes(null)) {
        return null;
    }
    return 'T';
}