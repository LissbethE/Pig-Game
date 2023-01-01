'use strict';

// Jugador Uno
const player = document.querySelectorAll('.player');

const player0 = document.querySelector('.player--0');
const score0 = document.getElementById('score--0');
const current0 = document.getElementById('current--0');

// Jugador Dos
const player1 = document.querySelector('.player--1');
const score1 = document.getElementById('score--1');
const current1 = document.getElementById('current--1');

// btn
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// coffee
const seed = Array.from(document.querySelectorAll('.seed'));
const vapour = Array.from(document.querySelectorAll('.vapour'));
const circle = Array.from(document.querySelectorAll('.circle'));
const coffee = Array.from(document.querySelectorAll('.coffee'));
const coffeeVacio = Array.from(document.querySelectorAll('.coffee-vacio'));

// -------------------------------------------------------------------------------------------------------------------

let scores, currentScore, activePlayer, playing;
let ll = [];

function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0.textContent = 0;
  current0.textContent = 0;
  score1.textContent = 0;
  current1.textContent = 0;

  diceEl.classList.add('hidden');

  player0.classList.remove('player--winner');
  player0.classList.add('player--active');

  player1.classList.remove('player--winner');
  player1.classList.remove('player--active');

  // Coffee ☕
  seed.forEach(s => s.classList.replace('semillaActiva', 'hidden'));
  circle.forEach(c => c.classList.replace('circle-vacio', 'circle'));
  vapour.forEach(v => v.classList.remove('hidden'));
  coffee.forEach(c => {
    c.classList.replace('active', 'coffee');
    c.style.height = 100 + '%';
  });
}
init();

function switchPlayer() {
  //                                   player: 0
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // player: 0 / Player1: currentScore = 0 + dice
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `./Img/dice-${dice}.png`;

    // Display empty coffee ☕
    circle.forEach(c => c.classList.replace('circle', 'circle-vacio'));
    document
      .querySelectorAll('.coffee')
      .forEach(c => (c.style.height = 0 + '%'));
    coffee.forEach(cf => {
      cf.classList.replace('coffee', 'active');
    });
    seed.forEach(s => s.classList.replace('semillaActiva', 'hidden'));
    vapour.forEach(v => v.classList.add('hidden'));

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
    // Switch to next player
    else switchPlayer();
  }
});

let alto = coffee;

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // coffee ☕
    document.querySelector(
      `.player--${activePlayer} .active`
    ).style.height = `${scores[activePlayer]}%`;

    document
      .querySelector(`.player--${activePlayer} .seed`)
      .classList.add('semillaActiva');

    if (scores[activePlayer] >= 100) {
      // 2. Check if player's score is >= 100
      // Finish the game
      playing = false;

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      diceEl.classList.add('hidden');

      // coffee ☕
      fullCofee(activePlayer);
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

function fullCofee(n) {
  document.querySelector(`.coffee--${n}`).classList.add('coffee');

  document
    .querySelector(`.circle--${n}`)
    .classList.replace('circle-vacio', 'circle');

  document.querySelector(`.vapour--${n}`).classList.remove('hidden');
}

btnNew.addEventListener('click', init);
