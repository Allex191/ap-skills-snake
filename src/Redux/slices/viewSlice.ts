import { createSlice } from "@reduxjs/toolkit";
import {
  GAME_HEIGHT,
  GAME_WIDTH,
  SCREEN_PADDING,
  UI_ADITIONAL_SCALE,
  UI_RAW_PERCENTAGE,
} from "data/gameConst";

export type CanvasLayersSize = {
  width: number;
  height: number;
};

export interface IviewSliceState {
  windowWidth: number;
  windowHeight: number;
  gameScale: number;
  uISize: number;
  uIItemsScale: number;
  isDark: boolean;
  canvasLayersSize: CanvasLayersSize;
}

const initialState: IviewSliceState = {
  windowWidth: 800,
  windowHeight: 800,
  gameScale: 1,
  uIItemsScale: 1,
  uISize: 400,
  isDark: false,
  canvasLayersSize: {
    width: 0,
    height: 0,
  },
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
        state.uIItemsScale = widthScale + UI_ADITIONAL_SCALE;
        state.uISize = Math.floor(
          (widthScale * GAME_WIDTH * UI_RAW_PERCENTAGE) / 100
        );

        // state.canvasLayersSize.height =
      } else if (action.payload.width >= action.payload.height) {
        const heightScale =
          action.payload.height / (GAME_HEIGHT + SCREEN_PADDING);

        state.gameScale = heightScale;
        state.uIItemsScale = heightScale + UI_ADITIONAL_SCALE;
        state.uISize = Math.floor(
          (heightScale * GAME_HEIGHT * UI_RAW_PERCENTAGE) / 100
        );
      }
    },
    setDefaultThemeMode: (state, action) => {
      state.isDark = action.payload;
    },
    changeThemeMode: (state, action) => {
      state.isDark = action.payload ? true : false;
      state.isDark = action.payload === null && !state.isDark;
    },
  },
});

export const { setGameSizes, setDefaultThemeMode, changeThemeMode } =
  viewSlice.actions;

export default viewSlice.reducer;
