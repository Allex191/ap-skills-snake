export const GAME_WIDTH = 600;
export const GAME_HEIGHT = 600;
export const GAME_SPEED = 200;
export const ITEM_SIZE = 20;

export const initialSnakeCoords = [
  { x: 300, y: 300 },
  { x: 280, y: 300 },
  { x: 260, y: 300 },
  { x: 240, y: 300 },
];

export const DIR_UP = "up";
export const DIR_LEFT = "left";
export const DIR_DOWN = "down";
export const DIR_RIGHT = "right";

export type DIR_TYPES =
  | typeof DIR_UP
  | typeof DIR_LEFT
  | typeof DIR_DOWN
  | typeof DIR_RIGHT;
