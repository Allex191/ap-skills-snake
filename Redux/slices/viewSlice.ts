import { createSlice } from "@reduxjs/toolkit";
import { GAME_WIDTH, SCREEN_PADDING } from "data/constants";

export interface CounterState {
  windowWidth: number;
  windowHeight: number;
  scale: number;
}

const initialState: CounterState = {
  windowWidth: 800,
  windowHeight: 800,
  scale: 1,
};

export const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    setGameSizes: (state, action) => {
      state.windowWidth = action.payload.width;
      state.windowHeight = action.payload.height;

      if (action.payload.width < action.payload.height) {
        state.scale = action.payload.width / (GAME_WIDTH + SCREEN_PADDING);
      } else {
        state.scale = action.payload.height / (GAME_WIDTH + SCREEN_PADDING);
      }
    },
  },
});

export const { setGameSizes } = viewSlice.actions;

export default viewSlice.reducer;
