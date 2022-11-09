const gameSizes = {
  lg: { size: 1680, divident: { x15: 112, x16: 105 } },
  md: { size: 1260, divident: { x15: 84, x18: 70 } },
  sm: { size: 840, divident: { x15: 56, x20: 42 } },
};

export const GAME_SPEED = 150;
export const ONE_FRAME_TIME = 16.6;
export const GAME_WIDTH = gameSizes.lg.size;
export const GAME_HEIGHT = gameSizes.lg.size;
export const ITEM_SIZE = gameSizes.lg.divident.x16;
export const SCREEN_PADDING = 200;

export const DIR_UP = "up";
export const DIR_LEFT = "left";
export const DIR_DOWN = "down";
export const DIR_RIGHT = "right";

export type DIR_TYPES =
  | typeof DIR_UP
  | typeof DIR_LEFT
  | typeof DIR_DOWN
  | typeof DIR_RIGHT;
