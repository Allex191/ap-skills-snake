import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  counter: { number: number; color: string };
  isGameStarted: boolean;
}

const initialState: CounterState = {
  counter: { number: 0, color: "green" },
  isGameStarted: false,
};

export const snakeSlice = createSlice({
  name: "snake",
  initialState,
  reducers: {
    startCounterR: (state) => {
      state.counter.number += 1;
      state.counter.color = state.counter.color === "green" ? "red" : "green";
    },
    resetCounterR: (state) => {
      state.counter.number = 0;
      state.counter.color = "green";
      state.isGameStarted = false;
    },
    startGameR: (state) => {
      state.isGameStarted = true;
    },
    stopGameR: (state) => {
      state.isGameStarted = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { startCounterR, resetCounterR, startGameR, stopGameR } =
  snakeSlice.actions;

export default snakeSlice.reducer;
