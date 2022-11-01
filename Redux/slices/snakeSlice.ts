import { createSlice } from "@reduxjs/toolkit";
import { DIR_RIGHT, DIR_TYPES, GAME_SPEED } from "data/constants";
import { getRandomApplePos, TCanvasItemShape } from "utils/utils";

export interface CounterState {
  isUIShown: boolean;
  isGameStarted: boolean;
  isGameOver: null | boolean;
  gameSpeed: null | number;
  gameSizes: {
    gameWidth: number;
    gameHeight: number;
    itemSize: number;
  };
  snakeCoords: TCanvasItemShape[];
  isStartArrowsShown: boolean;
  applePos: TCanvasItemShape[];
  snakeDir: DIR_TYPES;
  currentKey: DIR_TYPES;
}

const initialState: CounterState = {
  isUIShown: true,
  isGameStarted: false,
  isGameOver: null,
  gameSpeed: null,
  gameSizes: {
    gameWidth: 800,
    gameHeight: 800,
    itemSize: 40,
  },
  snakeCoords: [{ x: 0, y: 0 }],
  isStartArrowsShown: false,
  applePos: [{ x: 0, y: 0 }],
  snakeDir: DIR_RIGHT,
  currentKey: DIR_RIGHT,
};

export const snakeSlice = createSlice({
  name: "snake",
  initialState,
  reducers: {
    startGame: (state) => {
      state.isGameStarted = true;
      state.isGameOver = false;
      state.gameSpeed = GAME_SPEED;
      state.isUIShown = false;
      state.isStartArrowsShown = true;
      state.snakeCoords[0]!.x = state.gameSizes.gameWidth / 2;
      state.snakeCoords[0]!.y = state.gameSizes.gameHeight / 2;
      state.applePos = getRandomApplePos(
        state.snakeCoords,
        state.gameSizes.gameWidth,
        state.gameSizes.gameHeight,
        state.gameSizes.itemSize
      );
    },
    // startSnake: (state, action) => {},
    setGameOver: (state) => {
      state.isGameOver = true;
      state.isGameStarted = false;
      state.gameSpeed = null;
      state.isUIShown = true;
    },
    setSnakeNewCoords: (state, action) => {
      state.snakeCoords = action.payload;
    },
    setRandomApplePos: (state, action) => {
      state.applePos = action.payload;
    },
    setSnakeDir: (state, action) => {
      state.snakeDir = action.payload;
    },
    setCurrentKey: (state, action) => {
      state.currentKey = action.payload;
    },
  },
});

export const {
  startGame,
  setGameOver,
  setSnakeNewCoords,
  setRandomApplePos,
  setSnakeDir,
  setCurrentKey,
} = snakeSlice.actions;

export default snakeSlice.reducer;
