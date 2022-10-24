import { GAME_HEIGHT, GAME_WIDTH, ITEM_SIZE } from "data/constants";
import { useEffect, useRef, useState } from "react";
import { StyledBackgroundLayer } from "components/index.styled";
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
    const drawBGParts = (img: HTMLImageElement, oneOrTwo: 1 | 2) => {
      const rows = GAME_HEIGHT / ITEM_SIZE;
      const cols = GAME_WIDTH / ITEM_SIZE;
      for (let x = 0; x < rows; x++) {
        for (let y = 0; y < cols; y++) {
          if (x % oneOrTwo == y % oneOrTwo) {
            context.drawImage(
              img,
              y * ITEM_SIZE,
              x * ITEM_SIZE,
              ITEM_SIZE,
              ITEM_SIZE
            );
          }
        }
      }
    };
    const img1 = new Image();
    const img2 = new Image();
    img1.src = "grass-yellow.png";
    img2.src = "grass-blue.png";
    img1.onload = () => drawBGParts(img1, 1);
    img2.onload = () => drawBGParts(img2, 2);
  };

  return (
    <StyledBackgroundLayer
      width={GAME_WIDTH}
      height={GAME_HEIGHT}
      ref={canvasRef}
      id="canvas-background"
    >
      BackgroundLayer
    </StyledBackgroundLayer>
  );
};

export default BackgroundLayer;
