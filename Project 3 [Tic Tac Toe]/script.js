const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector('.game-board');
const winningMessageElement = document.getElementById('winningMessage');
const winningMessageTextElement = document.getElementById('winningMessageText');
const restartButton = document.getElementById('restartButton');
const resetScoresButton = document.getElementById('resetScoresButton');
const playerVsPlayerButton = document.getElementById('playerVsPlayer');
const playerVsComputerButton = document.getElementById('playerVsComputer');
const playerXScoreElement = document.getElementById('playerXScore');
const playerOScoreElement = document.getElementById('playerOScore');

let isPlayerTurn = true;
let isPlayerVsComputer = false;
let playerXScore = 0;
let playerOScore = 0;

playerVsPlayerButton.addEventListener('click', () => {
  isPlayerVsComputer = false;
  startGame();
});

playerVsComputerButton.addEventListener('click', () => {
  isPlayerVsComputer = true;
  startGame();
});

restartButton.addEventListener('click', startGame);
resetScoresButton.addEventListener('click', resetScores);

function startGame() {
  isPlayerTurn = true;
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove('show');
}

function handleClick(e) {
  if (!isPlayerTurn && isPlayerVsComputer) return;

  const cell = e.target;
  const currentClass = isPlayerTurn ? X_CLASS : O_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    if (isPlayerVsComputer) {
      isPlayerTurn = false;
      setBoardHoverClass();
      setTimeout(computerMove, 500);
    } else {
      swapTurns();
      setBoardHoverClass();
    }
  }
}

function computerMove() {
  const availableCells = [...cellElements].filter(cell => !cell.classList.contains(X_CLASS) && !cell.classList.contains(O_CLASS));
  if (availableCells.length === 0) return;

  const cell = availableCells[Math.floor(Math.random() * availableCells.length)];
  placeMark(cell, O_CLASS);
  if (checkWin(O_CLASS)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    isPlayerTurn = true;
    setBoardHoverClass();
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!';
  } else {
    winningMessageTextElement.innerText = `${isPlayerTurn ? "X's" : "O's"} Wins!`;
    if (isPlayerTurn) {
      playerXScore++;
      playerXScoreElement.innerText = playerXScore;
    } else {
      playerOScore++;
      playerOScoreElement.innerText = playerOScore;
    }
  }
  winningMessageElement.classList.add('show');
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  isPlayerTurn = !isPlayerTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(O_CLASS);
  if (isPlayerTurn) {
    board.classList.add(X_CLASS);
  } else {
    board.classList.add(O_CLASS);
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

function resetScores() {
  playerXScore = 0;
  playerOScore = 0;
  playerXScoreElement.innerText = playerXScore;
  playerOScoreElement.innerText = playerOScore;
}

document.addEventListener('DOMContentLoaded', (event) => {
  const playerVsPlayer = document.getElementById('playerVsPlayer');
  const playerVsComputer = document.getElementById('playerVsComputer');

  playerVsPlayer.addEventListener('change', function() {
      if (this.checked) {
          playerVsComputer.checked = false;
      }
  });

  playerVsComputer.addEventListener('change', function() {
      if (this.checked) {
          playerVsPlayer.checked = false;
      }
  });
});

