let playerPosition = { row: 0, col: 0 };
const gameboard = document.querySelector(".gameboard");

let { Wall, Space, Goal } = Tiles;
let { Character, Block, BlockDone } = Entities;

const createGamebord = () => {
  gameboard.innerHTML = "";

  for (let row = 0; row < tileMap01.height; row++) {
    for (let col = 0; col < tileMap01.width; col++) {
      const newElement = document.createElement("div");
      const tileType = getTileType(row, col);

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

  if (!canMoveTo(newRow, newCol)) {
    return false;
  }
  // Block positionsef
  let afterBlockRow = newRow + rowStep;
  let afterBlockCol = newCol + colStep;

  if (getTileType(newRow, newCol) === "B") {
    if (
      !canMoveTo(afterBlockRow, afterBlockCol) ||
      getTileType(afterBlockRow, afterBlockCol) === "B"
    ) {
      console.log("Cant move block");
      return false;
    } else {
      // Update tile, player and blockpostition
      updateTile(row, col, Character, Space, " ");
      updateTile(newRow, newCol, Block, Character, "P");
      updateTile(afterBlockRow, afterBlockCol, Space, Block, "B");

      playerPosition = { row: newRow, col: newCol };
    }
  } else if (getTileType(newRow, newCol) === " ") {
    updateTile(row, col, Character, Space, " ");
    updateTile(newRow, newCol, Space, Character, "P");

    playerPosition = { row: newRow, col: newCol };
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
const getTileType = (row, col) => {
  return tileMap01.mapGrid[row][col][0];
};
const setTileType = (row, col, tileType) => {
  tileMap01.mapGrid[row][col][0] = tileType;
};

const updateTile = (row, col, removeClass, addClass, tileType) => {
  let index = getTileIndex(row, col);
  gameboard.children[index].classList.remove(removeClass);
  gameboard.children[index].classList.add(addClass);
  setTileType(row, col, tileType);
};

createGamebord();

document.addEventListener("keydown", movePlayer);
