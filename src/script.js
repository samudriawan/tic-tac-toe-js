// get game board
const board = document.getElementById('board');
// get board cell
const cellElement = document.querySelectorAll('[data-target]');
// get message box
const messageBox = document.getElementById('showMessageBox');
// get message text placeholder
const messageText = document.querySelector('#showMessageText p');
// get reset button
const resetBtn = document.getElementById('restartBtn');
// get turn info
const turnInfo = document.querySelector('.turn-info');

// variables
let X_CLASS = 'x';
let O_CLASS = 'circle';
let IS_O_CLASS_TURN = false;
const WINNING_CONDITIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

startGame();

resetBtn.addEventListener('click', startGame);

function startGame() {
	IS_O_CLASS_TURN = false;
	turnInfo.innerHTML = 'Player X turn';
	// remove mark
	cellElement.forEach((cell) => {
		cell.classList.remove(X_CLASS);
		cell.classList.remove(O_CLASS);
		cell.removeEventListener('click', handleCellClick);
		cell.addEventListener('click', handleCellClick, { once: true });
	});

	boardHover();
	// hide winning message box
	messageBox.classList.remove('d-flex');
}

function handleCellClick(e) {
	const cell = e.target;
	const currentClass = IS_O_CLASS_TURN ? O_CLASS : X_CLASS;
	placeMark(cell, currentClass);
	if (checkWin(currentClass)) {
		endGame(false);
	} else if (isDraw()) {
		endGame(true);
	} else {
		swapTurn();
		boardHover();
	}
}

function placeMark(cell, currentClass) {
	cell.classList.add(currentClass);
}

function swapTurn() {
	IS_O_CLASS_TURN = !IS_O_CLASS_TURN;
	if (IS_O_CLASS_TURN) {
		turnInfo.innerHTML = 'Player O turn';
	} else {
		turnInfo.innerHTML = 'Player X turn';
	}
}

function boardHover() {
	board.classList.remove(X_CLASS);
	board.classList.remove(O_CLASS);
	if (IS_O_CLASS_TURN) {
		board.classList.add(O_CLASS);
	} else {
		board.classList.add(X_CLASS);
	}
}

function checkWin(currentClass) {
	return WINNING_CONDITIONS.some((combination) => {
		return combination.every((index) => {
			return cellElement[index].classList.contains(currentClass);
		});
	});
}

function endGame(draw) {
	if (draw) {
		messageText.innerHTML = "It's a draw!";
	} else {
		messageText.innerHTML = `Game Over, Player ${IS_O_CLASS_TURN ? 'O' : 'X'}'s wins!`;
	}
	messageBox.classList.add('d-flex');
}

function isDraw() {
	return [...cellElement].every((cell) => {
		return cell.classList.contains(O_CLASS) || cell.classList.contains(X_CLASS);
	});
}
