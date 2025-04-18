let mysteryNumber, maxAttempts, attemptsLeft, min, max;

const input = document.getElementById("userInput");
const feedback = document.getElementById("feedback");
const attemptsDisplay = document.getElementById("attempts");
const restartBtn = document.getElementById("restartBtn");
const gameContainer = document.getElementById("game");
const spanMin = document.getElementById("min");
const spanMax = document.getElementById("max");

const settings = {
  easy:   { min: 1, max: 10, attempts: 3 },
  medium: { min: 1, max: 50, attempts: 2 },
  hard:   { min: 1, max: 100, attempts: 1 }
};

function startGame(difficulty) {
  ({ min, max, attempts: maxAttempts } = settings[difficulty]);
  mysteryNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  attemptsLeft = maxAttempts;

  
  input.disabled = false;
  input.value = '';
  feedback.textContent = '';
  feedback.className = 'message';
  restartBtn.classList.add('hidden');
  gameContainer.classList.remove('hidden');

  spanMin.textContent = min;
  spanMax.textContent = max;
  updateAttempts();
}

function updateAttempts() {
  attemptsDisplay.textContent = `Essais restants : ${attemptsLeft}`;
}

function checkGuess() {
  const guess = parseInt(input.value, 10);
  if (isNaN(guess) || guess < min || guess > max) {
    showFeedback(`⚠️ Entrez un nombre entre ${min} et ${max}.`, 'error');
    return;
  }

  attemptsLeft--;

  setTimeout(() => {
    if (guess === mysteryNumber) {
      showFeedback(`🎉 Bravo ! C'était (${mysteryNumber}) !`, 'success');
      endGame();
    } else if (attemptsLeft === 0) {
      showFeedback(`❌ Perdu ! C'était ${mysteryNumber}.`, 'error');
      endGame();
    } else {
      const hint = guess < mysteryNumber ? "🔼 Nombre plus grand" : "🔽 Nombre plus petit";
      showFeedback(`${hint} !`, 'info');
      updateAttempts();
    }
  }, 500);
}

function showFeedback(message, type) {
  feedback.textContent = message;
  feedback.className = `message ${type}`;
}

function endGame() {
  input.disabled = true;
  restartBtn.classList.remove('hidden');
  updateAttempts();
}

function resetGame() {
  gameContainer.classList.add('hidden');
}

