import { createSlice } from "@reduxjs/toolkit";

const GAME_SPEED = 200;

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
    gameWidth: 800,
    gameHeight: 800,
    itemSize: 40,
  },
  snakeCoords: [{ x: 0, y: 0 }],
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
      state.snakeCoords[0]!.x = state.gameSizes.gameWidth / 3;
      state.snakeCoords[0]!.y = state.gameSizes.gameHeight / 3;
    },
    setSnakeNewCoords: (state, action) => {
      state.snakeCoords = action.payload;
    },
    setGameSizes: (state, action) => {
      if (action.payload.width < 800 || action.payload.height < 800)
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
