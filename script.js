let playerPosition = { row: 0, col: 0 };
const gameboard = document.querySelector(".gameboard");

const createGamebord = () => {
  gameboard.innerHTML = "";

  for (let row = 0; row < tileMap01.height; row++) {
    for (let col = 0; col < tileMap01.width; col++) {
      const newElement = document.createElement("div");
      const tileType = tileMap01.mapGrid[row][col][0];

      switch (tileType) {
        case "W":
          newElement.classList.add("tile-wall");
          break;
        case "G":
          newElement.classList.add("tile-goal");
          break;
        case "B":
          newElement.classList.add("entity-block");
          break;
        case "P":
          playerPosition = { row, col };
          newElement.classList.add("entity-player");
          break;
        default:
          newElement.classList.add("tile-space");
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
  // Block position
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
      updateTile(currentIndex, "entity-player", "tile-space");
      tileMap01.mapGrid[row][col][0] = " ";

      updateTile(targetIndex, "entity-block", "entity-player");
      tileMap01.mapGrid[newRow][newCol][0] = "P";

      updateTile(afterBlockIndex, "tile-space", "entity-block");
      tileMap01.mapGrid[afterBlockRow][afterBlockCol][0] = "B";

      playerPosition = { row: newRow, col: newCol };
      console.log("After BLOCK index: " + afterBlockIndex);
    }
  } else if (tileMap01.mapGrid[newRow][newCol][0] === " ") {
    updateTile(currentIndex, "entity-player", "tile-space");
    tileMap01.mapGrid[playerPosition.row][playerPosition.col][0] = " ";

    updateTile(targetIndex, "tile-space", "entity-player");
    tileMap01.mapGrid[newRow][newCol][0] = "P";

    playerPosition = { row: newRow, col: newCol };

    console.log("player: " + targetIndex);
  }

  // console.log("Playerindex AFTER: " + targetIndex);
  // console.log("Playerindex BEFORE: " + currentIndex);

  // prevent moving out of bounds
  //   if (canMoveTo(newRow, newCol)) {
  //     updateTile(currentIndex, "entity-player", "tile-space");
  //     updateTile(targetIndex, "tile-space", "entity-player");
  //     playerPosition = { row: newRow, col: newCol };
  //   } else {
  //     console.log("You hit a wall");
  //   }
  // if tile is block move block to next tile if space or goal
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
  console.log(tileMap01.mapGrid);
  console.log("player positions: " + playerPosition.row);
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
