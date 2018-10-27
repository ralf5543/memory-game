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
  console.log('wsfsd');
}

//Reset game button
const resetBtn = document.querySelector('.reset');
resetBtn.addEventListener('click', launchGame);

//init
launchGame();