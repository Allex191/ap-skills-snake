import { useCallback, useEffect, useRef, useState } from "react";
import { StyledBackgroundLayer } from "components/index.styled";
import { clearBoard } from "utils/utils";
import { useSelector } from "react-redux";
import { RootState } from "Redux/redux";
import { BG_EVEN_IMAGE, BG_PRIME_IMAGE } from "data/canvasImages";

const BackgroundLayer = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  const { gameWidth, gameHeight, itemSize } = useSelector(
    (state: RootState) => state.snakeReducer.gameSizes
  );
  const drawBackground = useCallback(
    async (context: CanvasRenderingContext2D) => {
      try {
        const drawBGParts = (
          prime: HTMLImageElement,
          even: HTMLImageElement
        ) => {
          const rows = gameWidth / itemSize;
          const cols = gameWidth / itemSize;
          for (let x = 0; x < rows; x++) {
            for (let y = 0; y < cols; y++) {
              if ((x + y) % 2 == 0) {
                context.drawImage(
                  prime,
                  y * itemSize,
                  x * itemSize,
                  itemSize,
                  itemSize
                );
              } else {
                context.drawImage(
                  even,
                  y * itemSize,
                  x * itemSize,
                  itemSize,
                  itemSize
                );
              }
            }
          }
        };

        const images = [new Image(), new Image()] as const;

        images[0].src = BG_PRIME_IMAGE;
        images[1].src = BG_EVEN_IMAGE;

        const promiseImgCallback = (image: HTMLImageElement) => {
          return new Promise<boolean>((resolve, reject) => {
            image.onload = () => resolve(true);
            setTimeout(() => {
              reject("image load took too long time");
            }, 60000);
            image.onerror = () =>
              reject(`error image ${image.src} ,not loaded`);
          });
        };
        const resolvedPromise = await Promise.all(
          images.map(promiseImgCallback)
        );
        if (resolvedPromise) {
          drawBGParts(images[0], images[1]);
        }
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  //draw on canvas
  useEffect(() => {
    if (canvasRef.current) {
      !context && setContext(canvasRef.current.getContext("2d"));
      clearBoard(context, gameWidth, gameHeight);
      context && drawBackground(context);
    }
  }, [context]);

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
