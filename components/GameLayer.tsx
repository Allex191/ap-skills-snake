import { StyledGameLayer } from "components/index.styled";
import { GAME_SPEED } from "data/constants";
import { useKeyHandler } from "hooks/useKeyHandler";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "Redux/redux";
import { setCurrentKey, startSnakeMovement } from "Redux/slices/snakeSlice";
import { snakeLogic } from "utils/snakeLogic";
import { clearBoard, drawObject } from "utils/utils";

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
  const { snakeCoords, tempCount } = useSelector(
    (state: RootState) => state.snakeReducer
  );
  const dispatch = useDispatch();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  const prevTime = useRef(0);

  //start game loop when speed is non null
  // useInterval(gameLoop, gameSpeed);

  const gameLoop = (curTime?: DOMHighResTimeStamp) => {
    if (curTime) {
      if (prevTime.current === 0 || curTime - prevTime.current >= GAME_SPEED) {
        console.log("gameLoop", curTime - prevTime.current);
        prevTime.current = curTime;
        snakeLogic(
          snakeCoords,
          itemSize,
          currentKey,
          gameWidth,
          gameHeight,
          applePos,
          dispatch,
          tempCount
        );
      }
    }
    window.requestAnimationFrame(gameLoop);
  };

  //start game loop
  useEffect(() => {
    if (gameSpeed && isGameStarted) gameLoop();

    //else stop gameLoop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameSpeed, isGameStarted]);

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
      <h1 style={{ color: "black", zIndex: "100", marginLeft: "auto" }}>
        tempCount{tempCount}
      </h1>
      <StyledGameLayer ref={canvasRef} width={gameWidth} height={gameHeight} />
    </>
  );
};

export default GameLayer;
