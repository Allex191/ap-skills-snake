import React, { useEffect, useRef, useState } from "react";
import { clearBoard, drawObject } from "utils/utils";

interface ICanvasBoard {
  width: number;
  height: number;
}

const SnakeTestC = ({ width, height }: ICanvasBoard) => {
  const [snake, setSnake] = useState([
    { x: 580, y: 300 },
    { x: 560, y: 300 },
    { x: 540, y: 300 },
    { x: 520, y: 300 },
    { x: 500, y: 300 },
  ]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [currentKey, setCurrentKey] = useState<"w" | "a" | "s" | "d">("d");
  const [lastKey, setLastKey] = useState("d");

  const snakeMoves = {
    w: snake[0]!.y - 20,
    a: snake[0]!.x - 20,
    s: snake[0]!.y + 20,
    d: snake[0]!.x + 20,
  };

  //draw when snake will change
  useEffect(() => {
    drawObject(
      canvasRef.current && canvasRef.current.getContext("2d"),
      snake,
      "black"
    );
    setContext(canvasRef.current && canvasRef.current.getContext("2d"));
  }, [snake]);

  //snake updating moving 
  useEffect(() => {
    if (isGameStarted) {
      const interval = setInterval(() => {
        setSnake(() => {
          const newXPosition = snakeMoves[currentKey];
          console.log(newXPosition)
          const newArr = [{ x: newXPosition, y: 300 }, ...snake];
          newArr.length !== 0 && newArr.pop();
          console.log(newArr);
          return newArr;
        });
        clearBoard(context);
        console.log(interval, "interval");
        return clearInterval(interval);
      }, 1000);
    }
  }, [context, currentKey, isGameStarted, snake, snakeMoves]);

  //keyhandler
  useEffect(() => {
    window.addEventListener("keydown", (ev) => {
      console.log("event", ev);
      if (ev.key === " " && !isGameStarted) {
        setIsGameStarted(true);
        console.log("spacebar");
      }
      if (isGameStarted) {
        if ((ev.key === "w" || ev.key === "ArrowUp") && currentKey !== "w") {
          setCurrentKey("w");
        }
        if ((ev.key === "a" || "ArrowLeft") && currentKey !== "a") {
          setCurrentKey("a");
        }
        if ((ev.key === "s" || "ArrowDown") && currentKey !== "s") {
          setCurrentKey("s");
        }
        if ((ev.key === "d" || "ArrowRight") && currentKey !== "d") {
          setCurrentKey("d");
        }
      }
    });
  }, [isGameStarted]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{ border: "2px solid black" }}
        width={width}
        height={height}
      />
      {!isGameStarted && <h2>Press space or start to start the game</h2>}
    </div>
  );
};

export default SnakeTestC;
