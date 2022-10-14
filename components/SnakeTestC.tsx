import React, { useEffect, useRef, useState } from "react";
import { globalState } from "store/reducers/reducers";
import { clearBoard, drawObject } from "utils/utils";

interface ICanvasBoard {
  width: number;
  height: number;
}

const CanvasBoard = ({ width, height }: ICanvasBoard) => {
  const [snake, setSnake] = useState([
    { x: 580, y: 300 },
    { x: 560, y: 300 },
    { x: 540, y: 300 },
    { x: 520, y: 300 },
    { x: 500, y: 300 },
  ]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  //draw when snake will change
  useEffect(() => {
    drawObject(
      canvasRef.current && canvasRef.current.getContext("2d"),
      snake,
      "black"
    );
    setContext(canvasRef.current && canvasRef.current.getContext("2d"));
  }, [snake]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSnake(() => {
        const newXPosition = snake[0]!.x + 20;
        const newArr = [{ x: newXPosition, y: 300 }, ...snake];
        newArr.length !== 0 && newArr.pop();
        console.log(newArr);
        return newArr;
      });
      clearBoard(context);
      console.log(interval, "interval");
      return clearInterval(interval);
    }, 1000);
  });

  return (
    <canvas
      ref={canvasRef}
      style={{ border: "2px solid black" }}
      width={width}
      height={height}
    />
  );
};

export default CanvasBoard;
