import { DIR_DOWN, DIR_LEFT, DIR_RIGHT, DIR_UP } from "data/gameConst";
import { SnakeSliceState } from "Redux/slices/snakeSlice";
import { CanvasItemShape } from "utils/utils";

export const getNextHeadPos = (
  snakeCoords: SnakeSliceState["snakeCoords"],
  itemSize: SnakeSliceState["gameSizes"]["itemSize"],
  currentKey: SnakeSliceState["currentKey"]
): CanvasItemShape[] => {
  const snakeMoves = {
    [DIR_UP]: { x: snakeCoords[0]!.x, y: snakeCoords[0]!.y - itemSize },
    [DIR_LEFT]: { x: snakeCoords[0]!.x - itemSize, y: snakeCoords[0]!.y },
    [DIR_DOWN]: { x: snakeCoords[0]!.x, y: snakeCoords[0]!.y + itemSize },
    [DIR_RIGHT]: { x: snakeCoords[0]!.x + itemSize, y: snakeCoords[0]!.y },
  };
  return [snakeMoves[currentKey]];
};
