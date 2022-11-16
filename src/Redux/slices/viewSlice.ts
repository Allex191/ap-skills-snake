import { createSlice } from "@reduxjs/toolkit";
import {
  GAME_HEIGHT,
  GAME_WIDTH,
  SCREEN_PADDING,
  UI_RAW_PERCENTAGE,
} from "data/constants";

export interface IviewSliceState {
  windowWidth: number;
  windowHeight: number;
  gameScale: number;
  uISize: number;
}

const initialState: IviewSliceState = {
  windowWidth: 800,
  windowHeight: 800,
  gameScale: 1,
  uISize: 400,
};

export const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    setGameSizes: (state, action) => {
      state.windowWidth = action.payload.width;
      state.windowHeight = action.payload.height;

      if (action.payload.width < action.payload.height) {
        const widthScale = action.payload.width / (GAME_WIDTH + SCREEN_PADDING);

        state.gameScale = widthScale;
        state.uISize = Math.floor(
          (widthScale * GAME_WIDTH * UI_RAW_PERCENTAGE) / 100
        );
      } else {
        const heightScale =
          action.payload.height / (GAME_HEIGHT + SCREEN_PADDING);

        state.gameScale = heightScale;
        state.uISize = Math.floor(
          (heightScale * GAME_HEIGHT * UI_RAW_PERCENTAGE) / 100
        );
      }
    },
  },
});

export const { setGameSizes } = viewSlice.actions;

export default viewSlice.reducer;
