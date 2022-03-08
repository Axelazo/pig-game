'use strict';

//Game Properties
const gameProperties = {
  turn: 0,
  p0Score: 0,
  p1Score: 0,
  p0HoldScore: 0,
  p1HoldScore: 0,
  diceValue: 1,
};

//Buttons
const btnNewGame = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Images, labels, etc
const imgDice = document.querySelector('.dice');
let sectionPlayer;

//Generates a random number between given interval
const randomNumberBetweenInterval = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

//Sets the dice image to the number
const setDiceImage = function (no) {
  imgDice.src = `dice-${no}.png`;
};

//Switches between the current player
const switchPlayer = function () {
  //Toggles the active class of the current player
  switchPlayerSection(gameProperties.turn);

  //Resets the hold score of the current player
  resetHoldScore(gameProperties.turn);

  //Switches the current player
  gameProperties.turn = 1 - gameProperties.turn;

  //Toggles the active class of the next (now current) player
  switchPlayerSection(gameProperties.turn);
};

//Gets the player hold score HTML element and toggles the active class
const switchPlayerSection = function (player) {
  sectionPlayer = document.querySelector(`.player--${player}`);
  sectionPlayer.classList.toggle('player--active');
};

const setPlayerSection = function () {
  sectionPlayer = document.querySelector(`.player--${player}`);
  sectionPlayer.classList.toggle('player--active');
};

//Triggered when hold button is pressed, gets the current player, adds the hold value
const addScore = function () {
  let player = gameProperties.turn;
  let score = gameProperties[`p${player}HoldScore`];

  //First we add the score to the current player, Logic
  gameProperties[`p${player}Score`] = gameProperties[`p${player}Score`] + score;

  //UI
  setScoreLabel(player);

  //Adding the hold score to the score of the player means finishing the turn, thus switching the player
  switchPlayer();
};

const setScoreLabel = function (player) {
  const labelScore = document.querySelector(`#score--${player}`);
  labelScore.textContent = gameProperties[`p${player}Score`];
};

const resetHoldScore = function (player) {
  //Logic
  gameProperties[`p${player}HoldScore`] = 0;

  //UI
  setHoldScoreLabel(player);
};

const addHoldScore = function (player, holdScore) {
  //Logic
  gameProperties[`p${player}HoldScore`] += holdScore;
  //UI
  setHoldScoreLabel(player);
};

const setHoldScoreLabel = function (player) {
  //UI
  const labelCurrentScore = document.querySelector(`#current--${player}`);
  labelCurrentScore.textContent = gameProperties[`p${player}HoldScore`];
};

//Rolling the dice
const rollDice = function () {
  gameProperties.diceValue = randomNumberBetweenInterval(1, 6);

  //if dice rolls 1, reset hold score and switch player, else add score to hold value to current player
  if (gameProperties.diceValue === 1) {
    switchPlayer();
  } else {
    addHoldScore(gameProperties.turn, gameProperties.diceValue);
  }

  setDiceImage(gameProperties.diceValue);

  console.log(gameProperties.turn);
};

//Resets all the game properties data and switches to player one
const newGame = function () {
  //Checks if is the player 1 turn
  if (gameProperties.turn === 0) {
    //do nothing
  } else {
    gameProperties.turn = 1;
    switchPlayer();
  }

  gameProperties.diceValue = 1;

  for (let i = 0; i < 2; i++) {
    gameProperties[`p${i}Score`] = 0;
    gameProperties[`p${i}HoldScore`] = 0;
    setHoldScoreLabel(i);
    setScoreLabel(i);
  }

  setDiceImage(gameProperties.diceValue);
};

//Click on the roll dice button
btnRollDice.addEventListener('click', rollDice);

//Click on the new game button
btnNewGame.addEventListener('click', newGame);

//Click on hold score, adds the current hold score to the active player
btnHold.addEventListener('click', addScore);
