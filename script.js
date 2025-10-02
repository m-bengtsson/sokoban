let playerPosition = { row: 0, col: 0 };
const gameboard = document.querySelector(".gameboard");

let { Wall, Space, Goal } = Tiles;
let { Character, Block, BlockDone } = Entities;

const createGamebord = () => {
  gameboard.innerHTML = "";

  for (let row = 0; row < tileMap01.height; row++) {
    for (let col = 0; col < tileMap01.width; col++) {
      const newElement = document.createElement("div");
      const tileType = tileMap01.mapGrid[row][col][0];

      switch (tileType) {
        case "W":
          newElement.classList.add(Wall);
          break;
        case "G":
          newElement.classList.add(Goal);
          break;
        case "B":
          newElement.classList.add(Block);
          break;
        case "P":
          playerPosition = { row, col };
          newElement.classList.add(Character);
          break;
        default:
          newElement.classList.add(Space);
          break;
      }
      gameboard.appendChild(newElement);
    }
  }
};

const tryMovePlayer = (rowStep, colStep) => {
  // Destructuring
  const { row, col } = playerPosition;

  // New position,
  const newRow = row + rowStep;
  const newCol = col + colStep;

  let currentIndex = getTileIndex(row, col);
  let targetIndex = getTileIndex(newRow, newCol);

  if (!canMoveTo(newRow, newCol)) {
    return false;
  }
  // Block positionsef
  let afterBlockRow = newRow + rowStep;
  let afterBlockCol = newCol + colStep;

  // console.log("Target: " + targetIndex);

  if (tileMap01.mapGrid[newRow][newCol][0] === "B") {
    let afterBlockIndex = getTileIndex(afterBlockRow, afterBlockCol);
    if (
      !canMoveTo(afterBlockRow, afterBlockCol) ||
      tileMap01.mapGrid[afterBlockRow][afterBlockCol][0] === "B"
    ) {
      console.log("Cant move block");
      return false;
    } else {
      // Update tilemap, player and blockpostition
      updateTile(currentIndex, Character, Space);
      tileMap01.mapGrid[row][col][0] = " ";

      updateTile(targetIndex, Block, Character);
      tileMap01.mapGrid[newRow][newCol][0] = "P";

      updateTile(afterBlockIndex, Space, Block);
      tileMap01.mapGrid[afterBlockRow][afterBlockCol][0] = "B";

      playerPosition = { row: newRow, col: newCol };
      console.log("After BLOCK index: " + afterBlockIndex);
    } // else if afterblock index is G and classname is entity-block
  } else if (tileMap01.mapGrid[newRow][newCol][0] === " ") {
    updateTile(currentIndex, Character, Space);
    tileMap01.mapGrid[playerPosition.row][playerPosition.col][0] = " ";

    updateTile(targetIndex, Space, Character);
    tileMap01.mapGrid[newRow][newCol][0] = "P";

    playerPosition = { row: newRow, col: newCol };

    console.log("player: " + targetIndex);
  }
};
const movePlayer = (event) => {
  let rowStep = 0;
  let colStep = 0;

  switch (event.key) {
    case "ArrowUp":
      rowStep = -1;
      break;
    case "ArrowDown":
      rowStep = 1;
      break;
    case "ArrowLeft":
      colStep = -1;
      break;
    case "ArrowRight":
      colStep = 1;
    default:
      break;
  }
  tryMovePlayer(rowStep, colStep);
};

// Returns true if position of tile is not a wall
const canMoveTo = (row, col) => {
  return tileMap01.mapGrid[row][col][0] !== "W";
};

const getTileIndex = (row, col) => {
  return row * tileMap01.width + col;
};

const updateTile = (index, removeClass, addClass) => {
  gameboard.children[index].classList.remove(removeClass);
  gameboard.children[index].classList.add(addClass);
};
createGamebord();

document.addEventListener("keydown", movePlayer);
