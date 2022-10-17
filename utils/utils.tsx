import {
  GAME_HEIGHT,
  GAME_WIDTH,
  initialSnakeCoords,
  ITEM_SIZE,
} from "data/constants";

export const clearBoard = (context: CanvasRenderingContext2D | null) => {
  if (context) {
    context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  }
};

export interface IObjectBody {
  x: number;
  y: number;
}

export const drawObject = (
  context: CanvasRenderingContext2D | null,
  objectBody: IObjectBody[],
  fillColor: string,
  strokeStyle = "#146356"
) => {
  if (context) {
    objectBody.forEach((object: IObjectBody) => {
      context.fillStyle = fillColor;
      context.strokeStyle = strokeStyle;
      context?.fillRect(object.x, object.y, ITEM_SIZE, ITEM_SIZE);
      context?.strokeRect(object.x, object.y, ITEM_SIZE, ITEM_SIZE);
    });
  }
};

export const getRandomApplePos = (snake = initialSnakeCoords) => {
  console.log("getRandomPos running");
  const getXY = () => {
    const randomX = Math.random() * GAME_WIDTH;
    const randomY = Math.random() * GAME_HEIGHT;
    const x = randomX - (randomX % ITEM_SIZE);
    const y = randomY - (randomY % ITEM_SIZE);
    return { x, y };
  };
  const newPos = getXY();

  let isRepeated = true;
  while (isRepeated) {
    console.log("while running");
    snake.forEach((object) => {
      if (object.x !== newPos.x && object.y !== newPos.y) {
        isRepeated = false;
      }
    });
  }
  return [newPos];
};

export const checkIsAppleConsumed = (headPos, applePos) => {
  if (headPos[0].x === applePos[0].x && headPos[0].y === applePos[0].y) {
    return true;
  } else {
    return false;
  }
};
