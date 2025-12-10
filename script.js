// Retrieving HTML5 elements
const gameArea = document.querySelector(".game__area");
const turnNumber = document.querySelector(".number");
const copyrightYear = document.querySelector(".year");

// Creating constants
const rows = 3;
const columns = 3;
const deck = [5, 3, 1, 2, 9, 6, 4, 8, 7];

// Creating variables
let game = [];
let turns = 0;
let currentTile;
let otherTile;

// Declaration of the startGame function which will allow us to manage the game's logic
const startGame = () => {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const img = deck.shift();
      // Create element html5 <img>
      const tile = document.createElement("img");
      tile.src = img + ".jpg";
      tile.id = i.toString() + "-" + j.toString();

      // DRAG FUNCTIONALITY

      // Listening to the dragstart event and dragStart function call
      tile.addEventListener("dragstart", dragStart);
      // Listening to the dragover event and dragOver function call
      tile.addEventListener("dragover", dragOver);
      // Listening to the dragenter event and dragEnter function call
      tile.addEventListener("dragenter", dragEnter);
      // Listening to the dragleave event and dragLeave function call
      tile.addEventListener("dragleave", dragLeave);
      // Listening to the drop event and dragdrop function call
      tile.addEventListener("drop", dragDrop);
      // Listening to the dragend event and dragEnd function call
      tile.addEventListener("dragend", dragEnd);

      // Add to the DOM
      gameArea.append(tile);
    }
  }
};

// Declaration of the dragStart function which will allow us to click an image to drag
const dragStart = (e) => {
  currentTile = e.target; // e.tagert refers to the img tile being dragged
};

// Declaration of the dragOver function which will allow us to move image around while clicked
const dragOver = (e) => {
  e.preventDefault();
};

// Declaration of the dragEnter function which will allow us to drag an image onto another one
const dragEnter = (e) => {
  e.preventDefault();
};

// Declaration of the dragLeave function which will allow us to drag an image leaving anohter image
const dragLeave = () => {};

// Declaration of the drapDrop function which will allow us drag an image over another image, drop the image
const dragDrop = (e) => {
  otherTile = e.target; // e.target refers to the img tile being dropped on
};

// Declaration of the dragEnd function which will allow us after drag drop, to swap the two tiles
const dragEnd = (e) => {
  if (!otherTile.src.includes("3.jpg")) {
    return;
  }

  let currentCoords = currentTile.id.split("-");
  let r = parseInt(currentCoords[0]);
  let c = parseInt(currentCoords[1]);

  let otherCoords = otherTile.id.split("-");
  let r2 = parseInt(otherCoords[0]);
  let c2 = parseInt(otherCoords[1]);

  let moveLeft = r == r2 && c2 == c - 1;
  let moveRight = r == r2 && c2 == c + 1;

  let moveUp = c == c2 && r2 == r - 1;
  let moveDown = c == c2 && r2 == r + 1;

  let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

  if (isAdjacent) {
    let currentSrc = currentTile.src;
    let otherSrc = otherTile.src;
    currentTile.src = otherSrc;
    otherTile.src = currentSrc;

    turns++;
    turnNumber.textContent = `${turns}`;
  }
};

// Declaration of the getCurrentYear function which will allow us the dynamic display of the year
const getCurrentYear = () => {
  const date = new Date();
  //console.log(date);

  const year = date.getFullYear();
  //console.log(year);

  copyrightYear.textContent = `${year}`;
};
// getCurrentYear() function call
getCurrentYear();

// as soon as the window loads
window.onload = () => {
  // startGame() function call
  startGame();
};
