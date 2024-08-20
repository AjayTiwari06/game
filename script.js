const board = document.getElementById('game-board');
const resetBtn = document.getElementById('reset-btn');
let currentPlayer = 'x';
let boardState = Array(9).fill(null);

function initializeBoard() {
    board.innerHTML = '';
    boardState.fill(null);
    currentPlayer = 'x';
    boardState.forEach((_, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = index;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    });
}

function handleCellClick(e) {
    const index = e.target.dataset.index;
    if (boardState[index] || checkWinner()) return;

    boardState[index] = currentPlayer;
    e.target.classList.add(currentPlayer);
    e.target.textContent = currentPlayer.toUpperCase();
    
    if (checkWinner()) {
        setTimeout(() => alert(${currentPlayer.toUpperCase()} wins!), 100);
    } else if (boardState.every(cell => cell)) {
        setTimeout(() => alert('It\'s a draw!'), 100);
    } else {
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return true;
        }
    }
    return false;
}

resetBtn.addEventListener('click', initializeBoard);

initializeBoard();