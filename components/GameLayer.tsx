import { StyledGameLayer } from "components/index.styled";
import { GAME_SPEED, ONE_FRAME_TIME } from "data/constants";
import { useKeyHandler } from "hooks/useKeyHandler";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "Redux/redux";
import {
  setCurrentKey,
  setTriggerToRunGameLogic,
  startSnakeMovement,
} from "Redux/slices/snakeSlice";
import { snakeLogic } from "utils/snakeLogic";
import { clearBoard, drawObject } from "utils/utils";

const GameLayer = () => {
  const {
    isGameStarted,
    gameSpeed,
    applePos,
    snakeDir,
    isArrowsTempShown,
    isGameOver,
    triggerToRunGameLogic,
    currentKey,
  } = useSelector((state: RootState) => state.snakeReducer);
  const { gameWidth, gameHeight, itemSize } = useSelector(
    (state: RootState) => state.snakeReducer.gameSizes
  );
  const { snakeCoords } = useSelector((state: RootState) => state.snakeReducer);
  const dispatch = useDispatch();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  const prevTimeRef = useRef(0);
  const gameLoopRef = useRef(0);

  const gameLoop = (curTime?: DOMHighResTimeStamp) => {
    if (curTime) {
      if (
        prevTimeRef.current === 0 ||
        curTime - prevTimeRef.current >= GAME_SPEED - ONE_FRAME_TIME
      ) {
        console.log("gameLoop", curTime - prevTimeRef.current);
        prevTimeRef.current = curTime;
        dispatch(setTriggerToRunGameLogic());
      }
    }
    gameLoopRef.current = window.requestAnimationFrame(gameLoop);
  };

  //start game loop
  useEffect(() => {
    if (gameSpeed) {
      gameLoop();
    } else {
      window.cancelAnimationFrame(gameLoopRef.current);
    }
  }, [gameSpeed]);

  // run snake logic when trigger on
  useEffect(() => {
    if (triggerToRunGameLogic)
      snakeLogic(
        snakeCoords,
        itemSize,
        currentKey,
        gameWidth,
        gameHeight,
        applePos,
        dispatch
      );
  }, [triggerToRunGameLogic]);

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

  return (
    <>
      <StyledGameLayer ref={canvasRef} width={gameWidth} height={gameHeight} />
    </>
  );
};

export default GameLayer;
