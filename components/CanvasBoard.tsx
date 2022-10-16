import {
  GAME_HEIGHT,
  GAME_SPEED,
  GAME_WIDTH,
  initialSnakeCoords,
  ITEM_SIZE,
} from "data/constants";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "Redux/redux";
import { startCounterR, startGameR } from "Redux/slices/snakeSlice";
import { useInterval } from "usehooks-ts";
import {
  clearBoard,
  drawObject,
  getRandomApplePos,
  IObjectBody,
} from "utils/utils";

const SnakeTestC = () => {
  const isGameStarted = useSelector(
    (state: RootState) => state.snakeReducer.isGameStarted
  );
  const dispatch = useDispatch();

  const [snake, setSnake] = useState(initialSnakeCoords);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [currentKey, setCurrentKey] = useState<"w" | "a" | "s" | "d">("d");
  const [forbiddenKey, setForbiddenKey] = useState("a");
  const [gameSpeed, setGameSpeed] = useState<null | number>(null);
  const [applePos, setApplePos] = useState<null | IObjectBody[]>(null);
  const [isAppleConsumed, setIsAppleConsumed] = useState(false);

  const getNextHeadPos = useCallback(() => {
    const snakeMoves = {
      w: { x: snake[0]!.x, y: snake[0]!.y - ITEM_SIZE },
      a: { x: snake[0]!.x - ITEM_SIZE, y: snake[0]!.y },
      s: { x: snake[0]!.x, y: snake[0]!.y + ITEM_SIZE },
      d: { x: snake[0]!.x + ITEM_SIZE, y: snake[0]!.y },
    };
    return [snakeMoves[currentKey]];
  }, [snake, currentKey]);

  //start game loop when speed is non null
  useInterval(() => {
    gameLoop();
  }, gameSpeed);

  //start stop game 
  useEffect(() => {
    setGameSpeed(isGameStarted ? GAME_SPEED : null);
  }, [isGameStarted]);

  //set Initial item coords
  useEffect(() => {
    !isGameStarted && setSnake(initialSnakeCoords);
    applePos === null && setApplePos(getRandomApplePos());
  }, [applePos, isGameStarted]);

  //draw on canvas
  useEffect(() => {
    if (canvasRef.current) {
      !context && setContext(canvasRef.current.getContext("2d"));
      clearBoard(context);
      applePos && drawObject(context, applePos, "red");
      drawObject(context, snake, "black");
    }
  }, [snake, context, applePos]);

  const checkAppleCollision = (headPos, applePos, setIsAppleConsumed) => {
    if (headPos[0].x === applePos[0].x && headPos[0].y === applePos[0].y) {
      setIsAppleConsumed(true);
    }
  };

  function gameLoop() {
    setIsAppleConsumed(false);
    const newHeadPosition = getNextHeadPos();
    checkAppleCollision(newHeadPosition, applePos, setIsAppleConsumed);
    const newSnakeArr = [...newHeadPosition, ...snake];
    if (isAppleConsumed) {
      setApplePos(getRandomApplePos(snake));
    } else {
      newSnakeArr.length !== 0 && newSnakeArr.pop();
    }
    setSnake(newSnakeArr);
  }

  //keyhandler
  useEffect(() => {
    const handleDesktopKeys = (ev: KeyboardEvent) => {
      if (ev.key === " " && !isGameStarted) {
        dispatch(startGameR());
        dispatch(startCounterR());
      }
      if (isGameStarted) {
        if (
          (ev.key === "w" || ev.key === "ArrowUp") &&
          currentKey !== "w" &&
          forbiddenKey !== "w"
        ) {
          setCurrentKey("w");
          setForbiddenKey("s");
          return;
        }
        if (
          (ev.key === "a" || ev.key === "ArrowLeft") &&
          currentKey !== "a" &&
          forbiddenKey !== "a"
        ) {
          setCurrentKey("a");
          setForbiddenKey("d");

          return;
        }
        if (
          (ev.key === "s" || ev.key === "ArrowDown") &&
          currentKey !== "s" &&
          forbiddenKey !== "s"
        ) {
          setCurrentKey("s");
          setForbiddenKey("w");

          return;
        }
        if (
          (ev.key === "d" || ev.key === "ArrowRight") &&
          currentKey !== "d" &&
          forbiddenKey !== "d"
        ) {
          setCurrentKey("d");
          setForbiddenKey("a");

          return;
        }
      }
    };
    document.addEventListener("keydown", handleDesktopKeys);

    return () => document.removeEventListener("keydown", handleDesktopKeys);
  }, [currentKey, dispatch, forbiddenKey, isGameStarted]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{ border: "2px solid black" }}
        width={GAME_WIDTH}
        height={GAME_HEIGHT}
      />
      {!isGameStarted && <h2>Press space or start to start the game</h2>}
    </div>
  );
};

export default SnakeTestC;
