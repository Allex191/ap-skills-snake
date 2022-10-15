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
  const [lastKey, setLastKey] = useState("d");
  const [gameSpeed, setGameSpeed] = useState<null | number>(null);

  const snakeMoves = useCallback(
    (currentKey) => {
      const snakeMoves = {
        w: snake[0]!.y - ITEM_SIZE,
        a: snake[0]!.x - ITEM_SIZE,
        s: snake[0]!.y + ITEM_SIZE,
        d: snake[0]!.x + ITEM_SIZE,
      };
      return snakeMoves[currentKey];
    },
    [snake]
  );

  //start game loop when speed is non null
  useInterval(() => {
    gameLoop();
  }, gameSpeed);

  //isGameStarted subscription
  useEffect(() => {
    isGameStarted ? setGameSpeed(GAME_SPEED) : setGameSpeed(null);
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
      const newXPosition = snakeMoves(currentKey);
      const newArr = [{ x: newXPosition, y: 300 }, ...snake];
      newArr.length !== 0 && newArr.pop();
      console.log("newArr", newArr);
      return newArr;
    });
  }

  // //keyhandler
  // useEffect(() => {
  //   window.addEventListener("keydown", (ev) => {
  //     console.log("event", ev);
  //     if (ev.key === " " && !isGameStarted) {
  //       console.log("spacebar");
  //       dispatch(startGameR());
  //       dispatch(startCounterR());
  //     }
  //     if (isGameStarted) {
  //       if ((ev.key === "w" || ev.key === "ArrowUp") && currentKey !== "w") {
  //         setCurrentKey("w");
  //       }
  //       if ((ev.key === "a" || "ArrowLeft") && currentKey !== "a") {
  //         setCurrentKey("a");
  //       }
  //       if ((ev.key === "s" || "ArrowDown") && currentKey !== "s") {
  //         setCurrentKey("s");
  //       }
  //       if ((ev.key === "d" || "ArrowRight") && currentKey !== "d") {
  //         setCurrentKey("d");
  //       }
  //     }
  //   });
  // }, [currentKey, dispatch, isGameStarted]);

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
