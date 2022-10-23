export const GAME_WIDTH = 1200;
export const GAME_HEIGHT = 1200;
export const GAME_SPEED = 200;
export const ITEM_SIZE = 40;

const MIDDLE_WIDTH = GAME_WIDTH / 2;
const MIDDLE_HEIGHT = GAME_HEIGHT / 2;

export const initialSnakeCoords = [
  { x: MIDDLE_WIDTH, y: MIDDLE_HEIGHT },
  { x: MIDDLE_WIDTH - ITEM_SIZE, y: MIDDLE_HEIGHT },
  { x: MIDDLE_WIDTH - ITEM_SIZE * 2, y: MIDDLE_HEIGHT },
  { x: MIDDLE_WIDTH - ITEM_SIZE * 3, y: MIDDLE_HEIGHT },
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
