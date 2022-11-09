import { useCallback, useEffect, useRef, useState } from "react";
import { StyledBackgroundLayer } from "components/index.styled";
import { clearBoard } from "utils/utils";
import { useSelector } from "react-redux";
import { RootState } from "Redux/redux";

const BackgroundLayer = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  const { gameWidth, gameHeight, itemSize } = useSelector(
    (state: RootState) => state.snakeReducer.gameSizes
  );
  const drawBackground = useCallback(
    async (context: CanvasRenderingContext2D) => {
      const drawBGParts = (img: HTMLImageElement, oneOrTwo: 1 | 2) => {
        const rows = gameWidth / itemSize;
        const cols = gameWidth / itemSize;
        for (let x = 0; x < rows; x++) {
          for (let y = 0; y < cols; y++) {
            if (x % oneOrTwo == y % oneOrTwo) {
              context.drawImage(
                img,
                y * itemSize,
                x * itemSize,
                itemSize,
                itemSize
              );
            }
          }
        }
      };
      const img1 = new Image();
      const img2 = new Image();
      // img1.onload = () => drawBGParts(img1, 1);
      img2.onload = () => {
        drawBGParts(img1, 1);
        drawBGParts(img2, 2);
      };
      img1.src = "grass-yellow.png";
      img2.src = "grass-blue.png";
    },
    [gameWidth, itemSize]
  );

  //draw on canvas
  useEffect(() => {
    if (canvasRef.current) {
      !context && setContext(canvasRef.current.getContext("2d"));
      clearBoard(context, gameWidth, gameHeight);
      context && drawBackground(context);
    }
  }, [context, drawBackground, gameHeight, gameWidth]);

  return (
    <StyledBackgroundLayer
      width={gameWidth}
      height={gameHeight}
      ref={canvasRef}
      id="canvas-background"
    >
      BackgroundLayer
    </StyledBackgroundLayer>
  );
};

export default BackgroundLayer;
