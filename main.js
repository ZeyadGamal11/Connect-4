const rows = 6;
const cols = 7;
const gameBoard = document.getElementById('game-board');
const resetBtn = document.getElementById('reset-btn');

let board = [];
let currentPlayer = 'red'; // Start with player 'red'

function createBoard() {
    board = [];
    gameBoard.innerHTML = ''; // Clear the existing cells
    for (let r = 0; r < rows; r++) {
        const row = [];
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.addEventListener('click', handleCellClick);
            gameBoard.appendChild(cell);
            row.push(null); // Empty slot in the beginning
        }
        board.push(row);
    }
}

function handleCellClick(event) {
    const col = parseInt(event.target.dataset.col);
    for (let r = rows - 1; r >= 0; r--) {
        if (!board[r][col]) { // Check if the cell is empty
            board[r][col] = currentPlayer;
            const cell = document.querySelector(`[data-row='${r}'][data-col='${col}']`);
            cell.classList.add(currentPlayer);

            if (checkForWin(r, col)) {
                setTimeout(() => alert(`${currentPlayer.toUpperCase()} Wins!`), 10);
                disableBoard();
            }

            currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red'; // Switch player
            break;
        }
    }
}

function checkForWin(row, col) {
    return checkDirection(row, col, 0, 1) || // Horizontal
           checkDirection(row, col, 1, 0) || // Vertical
           checkDirection(row, col, 1, 1) || // Diagonal \
           checkDirection(row, col, 1, -1);  // Diagonal /
}

function checkDirection(row, col, rowIncrement, colIncrement) {
    let count = 1;
    count += countInDirection(row, col, rowIncrement, colIncrement);
    count += countInDirection(row, col, -rowIncrement, -colIncrement);
    return count >= 4;
}

function countInDirection(row, col, rowIncrement, colIncrement) {
    let count = 0;
    let r = row + rowIncrement;
    let c = col + colIncrement;
    while (r >= 0 && r < rows && c >= 0 && c < cols && board[r][c] === currentPlayer) {
        count++;
        r += rowIncrement;
        c += colIncrement;
    }
    return count;
}

function disableBoard() {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.removeEventListener('click', handleCellClick);
    });
}

resetBtn.addEventListener('click', () => {
    currentPlayer = 'red'; // Reset to the starting player
    createBoard();
});

// Initialize the board on page load
createBoard();
