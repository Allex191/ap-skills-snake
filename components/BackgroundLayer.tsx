import { GAME_HEIGHT, GAME_WIDTH, ITEM_SIZE } from "data/constants";
import { useEffect, useRef, useState } from "react";
import { clearBoard } from "utils/utils";

const BackgroundLayer = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  //draw on canvas
  useEffect(() => {
    if (canvasRef.current) {
      !context && setContext(canvasRef.current.getContext("2d"));
      clearBoard(context);
      context && drawBackground(context);
    }
  }, [context]);

  const drawBackground = async (context: CanvasRenderingContext2D) => {
    const img = new Image();
    img.src = "grass-yellow.png";
    const rows = GAME_HEIGHT / ITEM_SIZE;
    const cols = GAME_WIDTH / ITEM_SIZE;
    img.onload = () => {
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          context.drawImage(
            img,
            j * ITEM_SIZE,
            i * ITEM_SIZE,
            ITEM_SIZE,
            ITEM_SIZE
          );
        }
      }
    };
  };

  return (
    <canvas
      width={GAME_WIDTH}
      height={GAME_HEIGHT}
      ref={canvasRef}
      id="canvas-background"
    >
      BackgroundLayer
    </canvas>
  );
};

export default BackgroundLayer;
