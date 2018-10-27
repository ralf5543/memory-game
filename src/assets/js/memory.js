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

//============================----------------------------

const memory = document.querySelector('.cards');

//target all elements of the ul list
let allCards = document.querySelectorAll('.card');

//change the NodeList returned to a real array, so we can use the shuffle function on it
let shuffledCards = Array.prototype.slice.call(allCards);

//used for performances (don't append each li one by one)
const fragment = document.createDocumentFragment();

const launchGame = function() {
  //shuffle the li elements
  shuffledCards = shuffle(shuffledCards);
  for (let shuffledCard of shuffledCards) {
    fragment.appendChild(shuffledCard);
  }
  //appends reordered li elements in ul
  memory.appendChild(fragment);
}

//Reset game button
const resetBtn = document.querySelector('.reset');
resetBtn.addEventListener('click', launchGame);

//init
launchGame();

//The array storing the 2 chosen cards at each try
let chosenCards = [];

//The buttons for each cards with event listeners
const cardBtn = document.querySelectorAll('.card__button');

const pickCard = function(e) {
  const _this = e.target;
  //we store the card in the array
  chosenCards.push(_this);
  // we prevent from chosing again that card
  _this.removeEventListener('click', pickCard);

  if (chosenCards.length === 2) {
    //when 2 cards have been picked, if the text of the elements are the same...
    if (chosenCards[0].outerText === chosenCards[1].outerText) {
      console.log('won !!!');
    } else {
      console.log('lost...');
      //If not, the 2 cards are selectable for a new try
      for (let chosenCard of chosenCards) {
        chosenCard.addEventListener('click', pickCard);
      }
    } // and the array is empty
      chosenCards = [];
  }
};

//adds the function to the button of every cards
for (i = 0; i < cardBtn.length; i ++) {
  cardBtn[i].addEventListener('click', pickCard);
}
