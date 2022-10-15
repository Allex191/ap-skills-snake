import { GAME_HEIGHT, GAME_WIDTH, ITEM_SIZE } from "data/constants";

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
