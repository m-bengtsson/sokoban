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

const getTileIndex = (row, col) => {
  return row * tileMap01.width + col;
};

const movePlayer = (event) => {
  let index = getTileIndex(playerPosition.row, playerPosition.col);

  let newRow = playerPosition.row;
  let newCol = playerPosition.col;

  switch (event.key) {
    case "ArrowUp":
      newRow -= 1;
      break;
    case "ArrowDown":
      newRow += 1;
      break;
    case "ArrowLeft":
      newCol -= 1;
      break;
    case "ArrowRight":
      newCol += 1;
    default:
      break;
  }
  let newIndex = getTileIndex(newRow, newCol);

  // prevent moving out of bounds
  if (tileMap01.mapGrid[newRow][newCol][0] !== "W") {
    updateTile(index, "entity-player", "tile-space");
    updateTile(newIndex, "tile-space", "entity-player");

    playerPosition = { row: newRow, col: newCol };
  } else {
    console.log("You hit a wall");
  }
  // if tile is block move block to next tile if space or goal

  console.log(newRow, newCol);
};

const updateTile = (index, removeClass, addClass) => {
  gameboard.children[index].classList.remove(removeClass);
  gameboard.children[index].classList.add(addClass);
};
createGamebord();

document.addEventListener("keydown", movePlayer);
