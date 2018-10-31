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

//=======================----------------- STARS MANAGEMENT
let stars = '5';

let starsIcons = document.querySelector('.stars');

let fullStarIcon = '<svg class="stars__icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-star"></use></svg>';
let emptyStarIcon = '<svg class="stars__icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-star-o"></use></svg>';

starsIcons.innerHTML = fullStarIcon + fullStarIcon + fullStarIcon + fullStarIcon + fullStarIcon;

//Launch timer
let startGameTime = performance.now();

const pickCard = function (e) {
  const _this = e.currentTarget;

  //the li containing the button toggles a class to "return" visually the card
  _this.parentNode.classList.toggle('is-revealed');

  //we store the card in the array
  chosenCards.push(_this);
  // we prevent from chosing again that card
  _this.removeEventListener('click', pickCard);

  if (chosenCards.length === 2) {
    //when 2 cards have been picked, if the text of the elements are the same...
    if (chosenCards[0].innerText === chosenCards[1].innerText) {
      for (let chosenCard of chosenCards) {
        chosenCard.parentNode.classList.add('is-correct');
      }
      score++;
    } else {
      //If not, the 2 cards are selectable for a new try...
      for (let chosenCard of chosenCards) {
        chosenCard.parentNode.classList.toggle('is-wrong');
        chosenCard.addEventListener('click', pickCard);
        //...and they're returned after 3s
        setTimeout(function () {
          //settimeout, to late the player see and remember his mistake
          chosenCard.parentNode.classList.toggle('is-revealed');
          chosenCard.parentNode.classList.toggle('is-wrong');
        }, 2000);

      }
    } // and the array is empty
    chosenCards = [];
    attemptsNumber++;
    counter.textContent = attemptsNumber;
    if (attemptsNumber > 1) {
      document.querySelector('.counterNumber__plural').textContent = 's';
    }

    if (attemptsNumber <= (allCards.length / 2)) {
      starsIcons.innerHTML = fullStarIcon + fullStarIcon + fullStarIcon + fullStarIcon + fullStarIcon;
      stars = 5;
    } else if (attemptsNumber <= ((allCards.length / 2) + 2)) {
      starsIcons.innerHTML = fullStarIcon + fullStarIcon + fullStarIcon + fullStarIcon + emptyStarIcon;
      stars = 4;
    } else if (attemptsNumber <= ((allCards.length / 2) + 4)) {
      starsIcons.innerHTML = fullStarIcon + fullStarIcon + fullStarIcon + emptyStarIcon + emptyStarIcon;
      stars = 3;
    } else if (attemptsNumber <= ((allCards.length / 2) + 6)) {
      starsIcons.innerHTML = fullStarIcon + fullStarIcon + emptyStarIcon + emptyStarIcon + emptyStarIcon;
      stars = 2;
    } else if (attemptsNumber <= ((allCards.length / 2) + 8)) {
      starsIcons.innerHTML = fullStarIcon + emptyStarIcon + emptyStarIcon + emptyStarIcon + emptyStarIcon;
      stars = 1;
    } else {
      starsIcons.innerHTML = emptyStarIcon + emptyStarIcon + emptyStarIcon + emptyStarIcon + emptyStarIcon;
      stars = 0;
    }
  }

  // when all pairs have been successfully revealed, the game is over
  if (score === shuffledCards.length / 2) {
    document.querySelector('.modal__text__stars').textContent = stars;
    if (stars >= 2) {
      document.querySelector('.modal__text__starsPlural').textContent = 's';
    }
    movesResults.textContent = attemptsNumber;

    //stop timer, and convert it in seconds
    const endGameTime = performance.now();

    const time = Math.floor((startGameTime - endGameTime) / 1000);
    const timeStringed = time.toString();

    //we remove the minor sign, and display the result
    document.querySelector('.modal__title__time').textContent = timeStringed.slice(1);

    toggleModal();
  }
};


const launchGame = function () {
  //reset trials, score, and timer
  score = 0;
  attemptsNumber = 0;
  startGameTime = performance.now();

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
};

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

