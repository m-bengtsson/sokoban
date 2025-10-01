let playerPosition = { row: 0, col: 0 };
const createGamebord = () => {
  const gameboard = document.querySelector(".gameboard");
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
createGamebord();

const getTileIndex = (row, col) => {
  return row * tileMap01.width + col;
};

const movePlayer = (event) => {
  const gameboard = document.querySelector(".gameboard");

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

  gameboard.children[index].classList.remove("entity-player");
  gameboard.children[index].classList.add("tile-space");

  gameboard.children[newIndex].classList.remove("tile-space");
  gameboard.children[newIndex].classList.add("entity-player");

  playerPosition = { row: newRow, col: newCol };
  console.log(newRow, newCol);
};

document.addEventListener("keydown", movePlayer);
