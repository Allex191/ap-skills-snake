import { GAME_HEIGHT, GAME_SPEED, GAME_WIDTH, ITEM_SIZE } from "data/constants";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "Redux/redux";
import { startCounterR, startGameR } from "Redux/slices/snakeSlice";
import { useInterval } from "usehooks-ts";
import { clearBoard, drawObject } from "utils/utils";
import TimerTestC from "./TimerTestC";

const initialCoords = [
  { x: 300, y: 300 },
  { x: 280, y: 300 },
  { x: 260, y: 300 },
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
  // const [lastKey, setLastKey] = useState("d");
  const [gameSpeed, setGameSpeed] = useState<null | number>(null);

  const getNextHeadPos = useCallback(
    () => {
      const snakeMoves = {
        w: { x: snake[0]!.x, y: snake[0]!.y - ITEM_SIZE },
        a: { x: snake[0]!.x - ITEM_SIZE, y: snake[0]!.y },
        s: { x: snake[0]!.x, y: snake[0]!.y + ITEM_SIZE },
        d: { x: snake[0]!.x + ITEM_SIZE, y: snake[0]!.y },
      };
      console.log("key callback", currentKey);
      console.log("newHeadCallback", snakeMoves[currentKey]);
      return snakeMoves[currentKey];
    },
    [snake, currentKey]
  );

  //start game loop when speed is non null
  useInterval(() => {
    gameLoop();
  }, gameSpeed);

  //start/reset game
  useEffect(() => {
    isGameStarted ? setGameSpeed(GAME_SPEED) : setGameSpeed(null);
    setSnake(initialCoords);
  }, [isGameStarted]);

  //draw when snake will change
  useEffect(() => {
    if (canvasRef.current) {
      setContext(canvasRef.current.getContext("2d"));
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
    const eventHanderCallBack = (ev) => {
      console.log("ev.key", ev.key);
      if (ev.key === " " && !isGameStarted) {
        dispatch(startGameR());
        dispatch(startCounterR());
      }
      if (isGameStarted) {
        if ((ev.key === "w" || ev.key === "ArrowUp") && currentKey !== "w") {
          setCurrentKey("w");
          return;
        }
        if ((ev.key === "a" || ev.key ==="ArrowLeft") && currentKey !== "a") {
          setCurrentKey("a");
          return;
        }
        if ((ev.key === "s" ||ev.key === "ArrowDown") && currentKey !== "s") {
          setCurrentKey("s");
          return;
        }
        if ((ev.key === "d" || ev.key ==="ArrowRight") && currentKey !== "d") {
          setCurrentKey("d");
          return;
        }
      }
    };
    document.addEventListener("keydown", eventHanderCallBack);

    return () => document.removeEventListener("keydown", eventHanderCallBack);
  }, [currentKey, dispatch, isGameStarted]);

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
