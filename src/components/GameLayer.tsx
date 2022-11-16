import { StyledGameLayer } from "components/index.styled";
import {
  STROKE_STYLE_COLLECTED_ITEMS,
  STROKE_STYLE_SPAWNED_ITEM,
} from "data/canvasImages";
import { GAME_SPEED, ONE_FRAME_TIME } from "data/constants";
import { useKeysHandler } from "hooks/useKeysHandler";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { moveSnake } from "Redux/middleware/startSnakeLogic";
import { RootState } from "Redux/redux";
import { preloadCanvasImages } from "utils/preloadCanvasImages";
import { clearBoard, drawObject } from "utils/utils";

const GameLayer = () => {
  const { isGameStarted, applePos, isGameOver } = useSelector(
    (state: RootState) => state.snakeReducer
  );
  const { gameWidth, gameHeight, itemSize } = useSelector(
    (state: RootState) => state.snakeReducer.gameSizes
  );
  const { snakeCoords, isSnakeReadyToMove } = useSelector(
    (state: RootState) => state.snakeReducer
  );

  const { spawnedImage, collectedImages } = useSelector(
    (state: RootState) => state.snakeReducer.skillsImagesData
  );
  const dispatch = useDispatch();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  const prevTimeRef = useRef(0);
  const gameLoopIDRef = useRef(0);

  const gameLoop = useCallback(
    (curTime?: DOMHighResTimeStamp) => {
      if (curTime) {
        const isFirstRun = prevTimeRef.current === 0;
        const isFrameDelayElapsed =
          curTime - prevTimeRef.current >= GAME_SPEED - ONE_FRAME_TIME / 2;
        if (isFirstRun || isFrameDelayElapsed) {
          prevTimeRef.current = curTime;
          dispatch(moveSnake());
        }
      }
      gameLoopIDRef.current = window.requestAnimationFrame(gameLoop);
    },
    [dispatch]
  );

  //start/stop game loop
  useEffect(() => {
    if (isSnakeReadyToMove) {
      gameLoop();
    } else {
      window.cancelAnimationFrame(gameLoopIDRef.current);
    }
  }, [gameLoop, isSnakeReadyToMove]);

  //dispatch userKeys
  useKeysHandler(dispatch);

  //draw on canvas
  useEffect(() => {
    if (canvasRef.current) {
      !context && setContext(canvasRef.current.getContext("2d"));
      clearBoard(context, gameWidth, gameHeight);

      if (isGameStarted || isGameOver) {
        drawObject(
          context,
          itemSize,
          applePos,
          spawnedImage,
          STROKE_STYLE_SPAWNED_ITEM
        );
        drawObject(
          context,
          itemSize,
          snakeCoords,
          collectedImages,
          STROKE_STYLE_COLLECTED_ITEMS
        );
      }
    }
  }, [snakeCoords, isGameStarted, isGameOver]);

  useEffect(() => {
    preloadCanvasImages();
  }, []);
  return (
    <>
      <StyledGameLayer ref={canvasRef} width={gameWidth} height={gameHeight} />
    </>
  );
};

export default GameLayer;
