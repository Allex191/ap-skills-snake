import { StyledGameLayer } from "components/index.styled";
import { GAME_SPEED } from "data/constants";
import { useKeyHandler } from "hooks/useKeyHandler";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "Redux/redux";
import {
  setCurrentKey,
  setGameOver,
  setRandomApplePos,
  setSnakeDir,
  setSnakeNewCoords,
  startSnakeMovement,
} from "Redux/slices/snakeSlice";
import { getNextHeadPos } from "utils/getNextHeadPos";
import {
  chechIfSnakeCollided,
  checkIsAppleConsumed,
  clearBoard,
  drawObject,
  getRandomApplePos,
} from "utils/utils";

const GameLayer = () => {
  const {
    isGameStarted,
    gameSpeed,
    applePos,
    snakeDir,
    currentKey,
    isArrowsTempShown,
    isGameOver,
  } = useSelector((state: RootState) => state.snakeReducer);
  const { gameWidth, gameHeight, itemSize } = useSelector(
    (state: RootState) => state.snakeReducer.gameSizes
  );
  const { snakeCoords } = useSelector((state: RootState) => state.snakeReducer);
  const dispatch = useDispatch();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  const prevTime = useRef(0);

  //start game loop when speed is non null
  // useInterval(gameLoop, gameSpeed);

  useEffect(() => {
    if (gameSpeed) window.requestAnimationFrame(gameLoop);
  }, [gameSpeed]);

  useKeyHandler(
    snakeDir,
    setCurrentKey,
    startSnakeMovement,
    isGameStarted,
    dispatch,
    isArrowsTempShown
  );

  //draw on canvas
  useEffect(() => {
    if (canvasRef.current) {
      !context && setContext(canvasRef.current.getContext("2d"));
      clearBoard(context, gameWidth, gameHeight);

      if (isGameStarted || isGameOver) {
        drawObject(context, applePos, "red", itemSize);
        drawObject(context, snakeCoords, "black", itemSize);
      }
    }
  }, [
    snakeCoords,
    context,
    applePos,
    gameWidth,
    gameHeight,
    itemSize,
    isGameStarted,
    isGameOver,
  ]);

  function gameLoop(curTime) {
    if (prevTime.current === 0 || curTime - prevTime.current >= GAME_SPEED) {
      console.log(curTime - prevTime.current);
      prevTime.current = curTime;
      moveSnake();
    }
    window.requestAnimationFrame(gameLoop);
  }

  function moveSnake() {
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

    console.log("loop running");
  }

  return (
    <StyledGameLayer ref={canvasRef} width={gameWidth} height={gameHeight} />
  );
};

export default GameLayer;
