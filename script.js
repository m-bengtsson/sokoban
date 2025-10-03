let playerPosition = { row: 0, col: 0 };
let tileUnderPlayer = TileTypes.Space;
const gameboard = document.querySelector(".gameboard");

const createGamebord = () => {
  gameboard.innerHTML = "";

  for (let row = 0; row < tileMap01.height; row++) {
    for (let col = 0; col < tileMap01.width; col++) {
      const newElement = document.createElement("div");
      const tileType = getTileType({ row, col });

      if (tileType === TileTypes.Player) {
        playerPosition = { row, col };
        // Check if original tile under player was a goal
        tileUnderPlayer =
          tileMap01.mapGrid[row][col][0] === TileTypes.Goal
            ? TileTypes.Goal
            : TileTypes.Space;
      }
      newElement.classList.add(TileClass[tileType]);
      gameboard.appendChild(newElement);
    }
  }
};

const tryPlayerMove = (rowStep, colStep) => {
  const { row, col } = playerPosition;
  const targetPosition = { row: row + rowStep, col: col + colStep };
  const afterTargetPosition = {
    row: targetPosition.row + rowStep,
    col: targetPosition.col + colStep,
  };

  console.log("tile under player: ", tileUnderPlayer);
  console.log(getTileType(playerPosition));
  // Exit function if tile next to player is a wall
  if (isWall(targetPosition)) return false;

  if (isBlock(targetPosition)) {
    //console.log("Block");
    if (isWall(afterTargetPosition) || isBlock(afterTargetPosition)) {
      return false;
      // } else if (isGoal(afterTargetPosition)) {
      //   console.log("GOAL");
      //   movePlayer(playerPosition, targetPosition);
    } else {
      moveBlock(targetPosition, afterTargetPosition);
      movePlayer(playerPosition, targetPosition);
    }
  } else {
    //console.log("Move player");
    movePlayer(playerPosition, targetPosition);
  }
};

const moveBlockInGoal = (fromPos, toPos) => {
  let index = getTileIndex(fromPos);

  gameboard.children[index].classList.remove(TileClass[oldTileType]);
  gameboard.children[index].classList.add(TileClass[newTileType]);
};

const movePlayer = (fromPos, toPos) => {
  updateTile(fromPos, tileUnderPlayer);
  tileUnderPlayer = getTileType(toPos);

  updateTile(toPos, TileTypes.Player);
  playerPosition = toPos;
};

const moveBlock = (fromPos, toPos) => {
  updateTile(fromPos, TileTypes.Space);
  updateTile(toPos, TileTypes.Block);
};

const updateTile = (pos, newTileType) => {
  let index = getTileIndex(pos);
  let oldTileType = getTileType(pos);

  gameboard.children[index].classList.remove(TileClass[oldTileType]);
  gameboard.children[index].classList.add(TileClass[newTileType]);
  setTileType(pos, newTileType);
};

const handlePlayerInput = (event) => {
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
  tryPlayerMove(rowStep, colStep);
};
const isGoal = (pos) => {
  return getTileType(pos) === TileTypes.Goal;
};
const isBlock = (pos) => {
  return getTileType(pos) === TileTypes.Block;
};
const isWall = (pos) => {
  return tileMap01.mapGrid[pos.row][pos.col][0] === "W";
};
const getTileType = (pos) => {
  return tileMap01.mapGrid[pos.row][pos.col][0];
};
const setTileType = (pos, tileType) => {
  tileMap01.mapGrid[pos.row][pos.col][0] = tileType;
};
const getTileIndex = (pos) => {
  return pos.row * tileMap01.width + pos.col;
};

createGamebord();

document.addEventListener("keydown", handlePlayerInput);
