'use strict';

let random = generateRandomNumber(1, 20);
let score = 20;
let highScore = localStorage.getItem('locHighScore') || 0;

const message = document.querySelector('.message');
const highScoreDisplay = document.querySelector('.highscore');
const scoreDisplay = document.querySelector('.score');
const numberDisplay = document.querySelector('.number');
const guessInput = document.querySelector('.guess');

updateHighScoreDisplay();

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(guessInput.value);

  if (!guess) {
    displayMessage('no number!!');
  } else if (score <= 1) {
    gameOver();
  } else if (guess === random) {
    winGame();
  } else if (guess > random) {
    displayMessage('lower');
    updateScore(-1);
  } else if (guess < random) {
    displayMessage('higher');
    updateScore(-1);
  }
});

document.querySelector('.again').addEventListener('click', function () {
  resetGame();
});

function generateRandomNumber(min, max) {
  return Math.trunc(Math.random() * (max - min + 1)) + min;
}

function displayMessage(text) {
  message.textContent = text;
}

function updateScore(value) {
  score += value;
  scoreDisplay.textContent = score;
}

function gameOver() {
  displayMessage('you lose');
  document.querySelector('body').style.backgroundColor = 'red';
  score = 0;
  numberDisplay.textContent = random;
}

function winGame() {
  displayMessage('you win');
  document.querySelector('body').style.backgroundColor = '#60b347';

  numberDisplay.style.width = '100%';
  numberDisplay.textContent = random;

  if (score > highScore) {
    highScore = score;
    localStorage.setItem('locHighScore', highScore);
    updateHighScoreDisplay();
  }
}

function updateHighScoreDisplay() {
  highScoreDisplay.textContent = highScore;
}

function resetGame() {
  random = generateRandomNumber(1, 20);
  numberDisplay.textContent = '?';
  score = 20;
  scoreDisplay.textContent = score;
  numberDisplay.style.width = '15rem';
  document.querySelector('body').style.backgroundColor = '#222';
  guessInput.value = '';
  displayMessage('');
}
