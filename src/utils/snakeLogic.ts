import {
  setGameOver,
  setRandomApplePos,
  setSnakeDir,
  setSnakeNewCoords,
} from "Redux/slices/snakeSlice";
import { getNextHeadPos } from "utils/getNextHeadPos";
import {
  chechIfSnakeCollided,
  checkIsAppleConsumed,
  getRandomApplePos,
} from "utils/utils";

export const snakeLogic = (
  snakeCoords,
  itemSize,
  currentKey,
  gameWidth,
  gameHeight,
  applePos,
  dispatch,
) => {
  const newHeadPosition = getNextHeadPos(snakeCoords, itemSize, currentKey);
  const isSnakeCollided = chechIfSnakeCollided(
    newHeadPosition,
    snakeCoords,
    gameWidth,
    gameHeight,
    itemSize
  );
  if (isSnakeCollided) {
    dispatch(setGameOver());
    return;
  }
  const isAppleConsumed = checkIsAppleConsumed(newHeadPosition, applePos);
  const newSnakeArr = [...newHeadPosition, ...snakeCoords];

  if (isAppleConsumed) {
    const randomApplePos = getRandomApplePos(
      snakeCoords,
      gameWidth,
      gameHeight,
      itemSize
    );
    dispatch(setRandomApplePos(randomApplePos));
  } else {
    newSnakeArr.length !== 0 && newSnakeArr.pop();
  }
  dispatch(setSnakeNewCoords(newSnakeArr));
  console.log("newSnakeArr", newSnakeArr);
  dispatch(setSnakeDir(currentKey));

};
