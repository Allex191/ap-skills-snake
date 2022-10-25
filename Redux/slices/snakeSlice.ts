import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

const GAME_WIDTH = 1200;
const GAME_HEIGHT = 1200;
const GAME_SPEED = 200;
const ITEM_SIZE = 40;

const MIDDLE_WIDTH = GAME_WIDTH / 2;
const MIDDLE_HEIGHT = GAME_HEIGHT / 2;

const SNAKE_COORDS = [
  { x: MIDDLE_WIDTH, y: MIDDLE_HEIGHT },
  { x: MIDDLE_WIDTH - ITEM_SIZE, y: MIDDLE_HEIGHT },
  { x: MIDDLE_WIDTH - ITEM_SIZE * 2, y: MIDDLE_HEIGHT },
  { x: MIDDLE_WIDTH - ITEM_SIZE * 3, y: MIDDLE_HEIGHT },
];

export interface CounterState {
  isGameStarted: boolean;
  isGameOver: null | boolean;
  gameSpeed: null | number;
  gameSizes: {
    gameWidth: number;
    gameHeight: number;
    itemSize: number;
  };
  snakeCoords: { x: number; y: number }[];
}

const initialState: CounterState = {
  isGameStarted: false,
  isGameOver: null,
  gameSpeed: null,
  gameSizes: {
    gameWidth: 1200,
    gameHeight: 1200,
    itemSize: 40,
  },
  snakeCoords: [
    { x: MIDDLE_WIDTH, y: MIDDLE_HEIGHT },
    { x: MIDDLE_WIDTH - ITEM_SIZE, y: MIDDLE_HEIGHT },
    { x: MIDDLE_WIDTH - ITEM_SIZE * 2, y: MIDDLE_HEIGHT },
    { x: MIDDLE_WIDTH - ITEM_SIZE * 3, y: MIDDLE_HEIGHT },
  ],
};

export const snakeSlice = createSlice({
  name: "snake",
  initialState,
  reducers: {
    startGame: (state) => {
      state.isGameStarted = true;
      state.isGameOver = false;
      state.gameSpeed = GAME_SPEED;
    },
    stopGame: (state) => {
      state.isGameStarted = false;
    },
    setGameOver: (state) => {
      state.isGameOver = true;
      state.isGameStarted = false;
      state.gameSpeed = null;
    },
    setSnakeInitialCoords: (state) => {
      state.snakeCoords = SNAKE_COORDS;
    },
    setSnakeNewCoords: (state, action) => {
      state.snakeCoords = action.payload;
    },
    setGameSizes: (state, action) => {
      state.gameSizes.gameWidth = action.payload.width - 100;
      state.gameSizes.gameHeight = action.payload.height - 100;
    },
  },
});

export const {
  startGame,
  stopGame,
  setGameOver,
  setSnakeInitialCoords,
  setSnakeNewCoords,
  setGameSizes,
} = snakeSlice.actions;

export default snakeSlice.reducer;
