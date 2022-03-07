'use strict';

//Game Properties
const gameProperties = {
  turn: 0,
  p1Score: 0,
  p2Score: 0,
  p1HoldScore: 0,
  p2HoldScore: 0,
  diceValue: 0,
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

const switchPlayer = function () {
  sectionPlayer = document.querySelector(`.player--${gameProperties.turn}`);
  sectionPlayer.classList.toggle('player--active');

  gameProperties.turn = 1 - gameProperties.turn;

  sectionPlayer = document.querySelector(`.player--${gameProperties.turn}`);
  sectionPlayer.classList.toggle('player--active');
};

const hold = function (player, score) {};

const addScore = function (player, score) {};

//Rolling the dice
const rollDice = function () {
  gameProperties.diceValue = randomNumberBetweenInterval(1, 6);

  if (gameProperties.diceValue === 1) switchPlayer();

  setDiceImage(gameProperties.diceValue);

  console.log(gameProperties.turn);
};

btnRollDice.addEventListener('click', rollDice);
