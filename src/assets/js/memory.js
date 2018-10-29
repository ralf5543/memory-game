//reorder an arraw children with random positions
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//==============------------------ MODAL
const modal = document.querySelector('.js-modal');
const toggleModal = function () {
  modal.classList.toggle('is-closed');
};

const modalClosersClass = document.querySelectorAll('.js-closeModal');
let modalClosers = Array.prototype.slice.call(modalClosersClass);

for (modalCloser of modalClosers) {
  modalCloser.addEventListener('click', toggleModal);
}


//store the attempts number
let attemptsNumber;

//store the successfull attempts
let score;

const memory = document.querySelector('.cards');

//target all elements of the ul list
let allCards = document.querySelectorAll('.card');

//change the NodeList returned to a real array, so we can use the shuffle function on it
let shuffledCards = Array.prototype.slice.call(allCards);

//used for performances (don't append each li one by one)
const fragment = document.createDocumentFragment();

//The buttons for each cards with event listeners
const cardBtn = document.querySelectorAll('.card__button');

let counter = document.querySelector('.counterNumber');

let movesResults = document.querySelector('.modal__text__moves');

//
let stars = 'rrr';

const pickCard = function (e) {
  const _this = e.currentTarget;

  //the li containing the button toggles a class to "return" visually the card
  _this.parentNode.classList.toggle('is-revealed');

  //we store the card in the array
  chosenCards.push(_this);
  // we prevent from chosing again that card
  _this.removeEventListener('click', pickCard);

  console.log('parentNode : ', _this.parentNode);
  console.log('e.target : ', e.currentTarget);

  if (chosenCards.length === 2) {
    //when 2 cards have been picked, if the text of the elements are the same...
    if (chosenCards[0].outerText === chosenCards[1].outerText) {
      console.log('a pair !');
      for (let chosenCard of chosenCards) {
        chosenCard.parentNode.classList.add('is-correct');
      }
      score++;
    } else {
      console.log('try again...');
      //If not, the 2 cards are selectable for a new try...
      for (let chosenCard of chosenCards) {
        chosenCard.parentNode.classList.toggle('is-wrong');
        chosenCard.addEventListener('click', pickCard);
        //...and they're returned after 3s
        setTimeout(function () {
          chosenCard.parentNode.classList.toggle('is-revealed');
          chosenCard.parentNode.classList.toggle('is-wrong');
        }, 3000);

      }
    } // and the array is empty
    chosenCards = [];
    attemptsNumber++;
    console.log('counter : ', counter);
    counter.textContent = attemptsNumber;

    if (attemptsNumber <= (allCards.length / 2)) {
      stars = 5;
    } else if (attemptsNumber <= ((allCards.length / 2) + 2)) {
      stars = 4;
      console.log(4);
    } else if (attemptsNumber <= ((allCards.length / 2) + 4)) {
      stars = 3;
    } else if (attemptsNumber <= ((allCards.length / 2) + 6)) {
      stars = 2;
    } else if (attemptsNumber <= ((allCards.length / 2) + 8)) {
      stars = 1;
    } else {
      stars = 0
    }

    document.querySelector('.stars').textContent = stars;
  }

  // when all pairs have been successfully revealed, the game is over
  if (score === shuffledCards.length / 2) {
    console.log('You win the game !!!');
    document.querySelector('.modal__text__stars').textContent = stars;
    if (stars >= 2) {
      document.querySelector('.modal__text__starsPlural').textContent = 's';
    }
    movesResults.textContent = attemptsNumber;
    toggleModal();
  }
};


const launchGame = function () {
  score = 0;
  attemptsNumber = 0;
  console.log('score : ', score);

  //shuffle the li elements
  shuffledCards = shuffle(shuffledCards);
  for (let shuffledCard of shuffledCards) {
    //remove win indications from last game
    shuffledCard.classList.remove('is-correct', 'is-wrong', 'is-revealed');
    fragment.appendChild(shuffledCard);
  }
  //appends reordered li elements in ul
  memory.appendChild(fragment);
  counter.textContent = 0;

  //adds the function to the button of every cards
  for (i = 0; i < cardBtn.length; i++) {
    cardBtn[i].addEventListener('click', pickCard);
  }
}

//Reset game button
//target all button elements with 'js-reset' class
const resetBtnsClass = document.querySelectorAll('.js-reset');

//change the NodeList returned to a real array
let resetBtns = Array.prototype.slice.call(resetBtnsClass);

for (let resetBtn of resetBtns) {
  resetBtn.addEventListener('click', launchGame);
}


//init
launchGame();

//The array storing the 2 chosen cards at each try
let chosenCards = [];

