import { createSlice } from "@reduxjs/toolkit";
import { GAME_SPEED } from "data/constants";


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
      state.snakeCoords[0]!.x = state.gameSizes.gameWidth / 2;
      state.snakeCoords[0]!.y = state.gameSizes.gameHeight / 2;
    },
    setSnakeNewCoords: (state, action) => {
      state.snakeCoords = action.payload;
    },
  },
});

export const {
  startGame,
  stopGame,
  setGameOver,
  setSnakeInitialCoords,
  setSnakeNewCoords,
} = snakeSlice.actions;

export default snakeSlice.reducer;
