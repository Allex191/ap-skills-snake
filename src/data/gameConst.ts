//smaller divisor, biger item-size, and less items in game
const gameSizes = {
  lg: {
    size: 1680,
    itemSize: { div13: 140, div14: 120, div15: 112, div16: 105 },
  },
  md: { size: 1260, itemSize: { div15: 84, div18: 70 } },
  sm: { size: 840, itemSize: { div15: 56, div20: 42 } },
};

export const GAME_SPEED = 150;
export const ONE_FRAME_TIME = 16.6;
export const GAME_WIDTH = gameSizes.lg.size;
export const GAME_HEIGHT = gameSizes.lg.size;
export const ITEM_SIZE = gameSizes.lg.itemSize.div13;
export const SCREEN_PADDING = 200;
export const UI_RAW_PERCENTAGE = 65;
export const UI_ADITIONAL_SCALE = 0.1;
export const GAME_SQUARES =
  (GAME_WIDTH / ITEM_SIZE) * (GAME_HEIGHT / ITEM_SIZE);

export const DIR_UP = "up";
export const DIR_LEFT = "left";
export const DIR_DOWN = "down";
export const DIR_RIGHT = "right";

export type DIR_TYPES =
  | typeof DIR_UP
  | typeof DIR_LEFT
  | typeof DIR_DOWN
  | typeof DIR_RIGHT;
