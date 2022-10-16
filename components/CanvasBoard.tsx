import { GAME_HEIGHT, GAME_SPEED, GAME_WIDTH, ITEM_SIZE } from "data/constants";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "Redux/redux";
import { startCounterR, startGameR } from "Redux/slices/snakeSlice";
import { useInterval } from "usehooks-ts";
import { clearBoard, drawObject } from "utils/utils";

const initialCoords = [
  { x: 300, y: 300 },
  { x: 280, y: 300 },
  { x: 260, y: 300 },
  { x: 240, y: 300 },
];

const SnakeTestC = () => {
  const isGameStarted = useSelector(
    (state: RootState) => state.snakeReducer.isGameStarted
  );
  const dispatch = useDispatch();

  const [snake, setSnake] = useState(initialCoords);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [currentKey, setCurrentKey] = useState<"w" | "a" | "s" | "d">("d");
  const [forbiddenKey, setForbiddenKey] = useState("a");
  const [gameSpeed, setGameSpeed] = useState<null | number>(null);

  const getNextHeadPos = useCallback(() => {
    const snakeMoves = {
      w: { x: snake[0]!.x, y: snake[0]!.y - ITEM_SIZE },
      a: { x: snake[0]!.x - ITEM_SIZE, y: snake[0]!.y },
      s: { x: snake[0]!.x, y: snake[0]!.y + ITEM_SIZE },
      d: { x: snake[0]!.x + ITEM_SIZE, y: snake[0]!.y },
    };
    console.log("key callback", currentKey);
    console.log("newHeadCallback", snakeMoves[currentKey]);
    return snakeMoves[currentKey];
  }, [snake, currentKey]);

  //start game loop when speed is non null
  useInterval(() => {
    gameLoop();
  }, gameSpeed);

  //start/reset game
  useEffect(() => {
    setGameSpeed(isGameStarted ? GAME_SPEED : null);
    setSnake(initialCoords);
  }, [isGameStarted]);

  //draw when snake will change
  useEffect(() => {
    if (canvasRef.current) {
      !context && setContext(canvasRef.current.getContext("2d"));
      clearBoard(context);
      drawObject(context, snake, "black");
    }
  }, [snake, context]);

  function gameLoop() {
    setSnake(() => {
      const newHeadPosition = getNextHeadPos();
      const newArr = [newHeadPosition, ...snake];
      console.log("newArr", newArr);
      newArr.length !== 0 && newArr.pop();
      return newArr;
    });
  }

  //keyhandler
  useEffect(() => {
    const handleDesktopKeys = (ev: KeyboardEvent) => {
      console.log("ev.key", ev.key);
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
