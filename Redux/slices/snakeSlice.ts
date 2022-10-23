import { createSlice } from "@reduxjs/toolkit";
import { GAME_SPEED } from "data/constants";
// import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  isGameStarted: boolean;
  isGameOver: null | boolean;
  gameSpeed: null | number;
}

const initialState: CounterState = {
  isGameStarted: false,
  isGameOver: null,
  gameSpeed: null,
};

export const snakeSlice = createSlice({
  name: "snake",
  initialState,
  reducers: {
    startGameR: (state) => {
      state.isGameStarted = true;
      state.isGameOver = false;
      state.gameSpeed = GAME_SPEED;
    },
    stopGameR: (state) => {
      state.isGameStarted = false;
    },
    setGameOver: (state) => {
      state.isGameOver = true;
      state.isGameStarted = false;
      state.gameSpeed = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { startGameR, stopGameR, setGameOver } = snakeSlice.actions;

export default snakeSlice.reducer;
