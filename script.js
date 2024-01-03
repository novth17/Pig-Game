"use strict";

// Selecting Elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");

const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

const init = function () {
  //we will store the big score of each player in an array
  // starting condition make score become 0
  scores = [0, 0];
  //set current player score to 0
  currentScore = 0;
  activePlayer = 0;
  //if the game still playing or not
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  // hide the dice, only appear when press roll dice
  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

// switch player function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};
// FUNCTIONS!!!!!!!!!

// ROLL DICE FUNCTIONALITY
btnRoll.addEventListener("click", function () {
  if (playing) {
    //1. generating random dice rolls
    const diceRollResult = Math.trunc(Math.random() * 6) + 1;

    //2. display the dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${diceRollResult}.png`;

    //3. check if roll is 1. If true,

    if (diceRollResult !== 1) {
      // add Dice Result to current score
      currentScore += diceRollResult;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch the to next player
      switchPlayer();
    }
  }
});

// Hold score function
btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. add score to active player

    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if player's score is >=100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");

      diceEl.classList.add("hidden");
    } else {
      //Switch player
      switchPlayer();
    }
  }
});

// New game function

btnNew.addEventListener("click", init);
