import { DIR_DOWN, DIR_LEFT, DIR_RIGHT, DIR_UP } from "data/constants";
import { CounterState } from "Redux/slices/snakeSlice";

export const getNextHeadPos = (
  snakeCoords: CounterState["snakeCoords"],
  itemSize: CounterState["gameSizes"]["itemSize"],
  currentKey: CounterState["currentKey"]
) => {
  const snakeMoves = {
    [DIR_UP]: { x: snakeCoords[0]!.x, y: snakeCoords[0]!.y - itemSize },
    [DIR_LEFT]: { x: snakeCoords[0]!.x - itemSize, y: snakeCoords[0]!.y },
    [DIR_DOWN]: { x: snakeCoords[0]!.x, y: snakeCoords[0]!.y + itemSize },
    [DIR_RIGHT]: { x: snakeCoords[0]!.x + itemSize, y: snakeCoords[0]!.y },
  };
  return [snakeMoves[currentKey]];
};
