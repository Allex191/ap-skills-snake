import {
  FALLBACK_IMG,
  FIRST_IMAGE_ARR_ID,
  ImageIdArr,
  STROKE_DEVIATION_STORY_IMGS,
  STROKE_STYLE_FIRST_SNAKE_IMG,
} from "data/canvasImages";
import { PRELOADED_IMAGES_OBJ } from "./preloadCanvasImages";

export const clearBoard = (
  context: CanvasRenderingContext2D | null,
  gameWidth: number,
  gameHeight: number
) => {
  if (context) {
    context.clearRect(0, 0, gameWidth, gameHeight);
  }
};

export type CanvasItemShape = {
  x: number;
  y: number;
};

export const drawObject = (
  context: CanvasRenderingContext2D | null,
  itemSize: number,
  objectBody: CanvasItemShape[],
  spawnedOrCollectedImgDataArr: ImageIdArr,
  strokeStyle: string
) => {
  if (context) {
    objectBody.forEach((object, i) => {
      const isTheFirstSnakeImg =
        i === 0 && spawnedOrCollectedImgDataArr[0] === FIRST_IMAGE_ARR_ID[0];
      const draw = (img: HTMLImageElement) => {
        context.drawImage(img, object.x, object.y, itemSize, itemSize);
      };
      draw(
        PRELOADED_IMAGES_OBJ[spawnedOrCollectedImgDataArr[i] || FALLBACK_IMG]
      );
      if (isTheFirstSnakeImg) {
        context.strokeStyle = STROKE_STYLE_FIRST_SNAKE_IMG;
      } else {
        context.strokeStyle = strokeStyle;
      }

      context.lineWidth = 10;
      context.strokeRect(
        object.x + STROKE_DEVIATION_STORY_IMGS,
        object.y + STROKE_DEVIATION_STORY_IMGS,
        itemSize - STROKE_DEVIATION_STORY_IMGS,
        itemSize - STROKE_DEVIATION_STORY_IMGS
      );
    });
  }
};

export const getRandomApplePos = (
  snake: CanvasItemShape[],
  gameWidth: number,
  gameHeight: number,
  itemSize: number
) => {
  const getXY = () => {
    const randomX = Math.random() * gameWidth;
    const randomY = Math.random() * gameHeight;
    const x = randomX - (randomX % itemSize);
    const y = randomY - (randomY % itemSize);
    return { x, y };
  };

  let newApplePos: CanvasItemShape = getXY();

  const getIsAppleNotInSnake = () => {
    return snake.every(
      (obj) => obj.x !== newApplePos.x || obj.y !== newApplePos.y
    );
  };
  let isAppleNotInSnake = getIsAppleNotInSnake();

  while (!isAppleNotInSnake) {
    newApplePos = getXY();
    isAppleNotInSnake = getIsAppleNotInSnake();
  }

  return [newApplePos];
};

export const checkIsAppleConsumed = (
  headPos: CanvasItemShape[],
  applePos: CanvasItemShape[]
) => {
  if (headPos[0]?.x === applePos[0]?.x && headPos[0]?.y === applePos[0]?.y) {
    return true;
  } else {
    return false;
  }
};

export const checkIfSnakeCollided = (
  newHeadPosition,
  snake,
  gameWidth,
  gameHeight,
  itemSize
): boolean => {
  const hasCollidedItself = snake.some(
    (object) =>
      newHeadPosition[0].x === object.x && newHeadPosition[0].y === object.y
  );

  const checkIfCollidedBorders = () => {
    if (
      newHeadPosition[0].x < 0 ||
      newHeadPosition[0].x > gameWidth - itemSize ||
      newHeadPosition[0].y < 0 ||
      newHeadPosition[0].y > gameHeight - itemSize
    ) {
      return true;
    } else {
      return false;
    }
  };
  return hasCollidedItself || checkIfCollidedBorders();
};

export const getWindowSize = () => {
  const windowSize = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  return windowSize;
};
