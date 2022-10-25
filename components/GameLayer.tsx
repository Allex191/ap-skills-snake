import {
  DIR_DOWN,
  DIR_LEFT,
  DIR_RIGHT,
  DIR_TYPES,
  DIR_UP,
} from "data/constants";
import { useInterval } from "hooks/useInterval";
import { useKeyHandler } from "hooks/useKeyHandler";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "Redux/redux";
import {
  setGameOver,
  setSnakeInitialCoords,
  setSnakeNewCoords,
} from "Redux/slices/snakeSlice";
import { StyledGameLayer } from "components/index.styled";
import {
  chechIfSnakeCollided,
  checkIsAppleConsumed,
  clearBoard,
  drawObject,
  getRandomApplePos,
  IObjectBody,
} from "utils/utils";

const SnakeTestC = () => {
  const { isGameStarted, gameSpeed } = useSelector(
    (state: RootState) => state.snakeReducer
  );
  const { gameWidth, gameHeight, itemSize } = useSelector(
    (state: RootState) => state.snakeReducer.gameSizes
  );

  const { snakeCoords } = useSelector((state: RootState) => state.snakeReducer);
  const dispatch = useDispatch();

  const [snakeDir, setSnakeDir] = useState<DIR_TYPES>(DIR_RIGHT);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [currentKey, setCurrentKey] = useState<DIR_TYPES>(DIR_RIGHT);
  const [applePos, setApplePos] = useState<null | IObjectBody[]>(null);

  const getNextHeadPos = useCallback(() => {
    const snakeMoves = {
      [DIR_UP]: { x: snakeCoords[0]!.x, y: snakeCoords[0]!.y - itemSize },
      [DIR_LEFT]: { x: snakeCoords[0]!.x - itemSize, y: snakeCoords[0]!.y },
      [DIR_DOWN]: { x: snakeCoords[0]!.x, y: snakeCoords[0]!.y + itemSize },
      [DIR_RIGHT]: { x: snakeCoords[0]!.x + itemSize, y: snakeCoords[0]!.y },
    };
    return [snakeMoves[currentKey]];
  }, [snakeCoords, itemSize, currentKey]);

  //start game loop when speed is non null
  useInterval(gameLoop, gameSpeed);
  useKeyHandler(snakeDir, setCurrentKey, isGameStarted, dispatch);

  //set Initial item coords
  useEffect(() => {
    if (!isGameStarted) {
      dispatch(setSnakeInitialCoords());
      setCurrentKey(DIR_RIGHT);
    }

    if (applePos === null) {
      const randomApplePos = getRandomApplePos(
        snakeCoords,
        gameWidth,
        gameHeight,
        itemSize
      );
      setApplePos(randomApplePos);
    }
  }, [
    applePos,
    isGameStarted,
    gameSpeed,
    dispatch,
    snakeCoords,
    gameWidth,
    gameHeight,
    itemSize,
  ]);

  //draw on canvas
  useEffect(() => {
    if (canvasRef.current) {
      !context && setContext(canvasRef.current.getContext("2d"));
      clearBoard(context, gameWidth, gameHeight);
      applePos && drawObject(context, applePos, "red", itemSize);
      drawObject(context, snakeCoords, "black", itemSize);
    }
  }, [snakeCoords, context, applePos, gameWidth, gameHeight, itemSize]);

  function gameLoop() {
    const newHeadPosition = getNextHeadPos();
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
      setApplePos(
        getRandomApplePos(snakeCoords, gameWidth, gameHeight, itemSize)
      );
    } else {
      newSnakeArr.length !== 0 && newSnakeArr.pop();
    }
    dispatch(setSnakeNewCoords(newSnakeArr));
    setSnakeDir(currentKey);
  }

  return (
    <StyledGameLayer ref={canvasRef} width={gameWidth} height={gameHeight} />
  );
};

export default SnakeTestC;
