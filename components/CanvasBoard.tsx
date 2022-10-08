import React, { useEffect, useRef, useState } from "react";

interface ICanvasBoard {
  width: number;
  height: number;
}

const CanvasBoard = ({ width, height }: ICanvasBoard) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    setContext(canvasRef.current && canvasRef.current.getContext("2d"));
  }, [context]);

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
