import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  DIR_RIGHT,
  DIR_TYPES,
  GAME_HEIGHT,
  GAME_SPEED,
  GAME_WIDTH,
  ITEM_SIZE,
} from "data/constants";
import { getRandomApplePos, TCanvasItemShape } from "utils/utils";

export interface IsnakeSliceState {
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
  isSnakeReadyToMove: boolean;

  isArrowsTempShown: boolean;
  applePos: TCanvasItemShape[];
  snakeDir: DIR_TYPES;
  currentKey: DIR_TYPES;
  triggerToRunGameLogic: boolean;
}

const initialState: IsnakeSliceState = {
  isUIShown: true,
  isGameStarted: false,
  isGameOver: null,
  gameSpeed: GAME_SPEED,
  gameSizes: {
    gameWidth: GAME_WIDTH,
    gameHeight: GAME_HEIGHT,
    itemSize: ITEM_SIZE,
  },
  snakeCoords: [{ x: 0, y: 0 }],
  isSnakeReadyToMove: false,
  isArrowsTempShown: false,
  applePos: [{ x: 0, y: 0 }],
  snakeDir: DIR_RIGHT,
  currentKey: DIR_RIGHT,
  triggerToRunGameLogic: false,
};

export const snakeSlice = createSlice({
  name: "snake",
  initialState,
  reducers: {
    startGame: (state) => {
      state.snakeCoords = [{ x: 0, y: 0 }];
      state.isGameStarted = true;
      state.isGameOver = false;
      state.isUIShown = false;
      state.isArrowsTempShown = true;
      state.snakeCoords[0]!.x = state.gameSizes.gameWidth / 2;
      state.snakeCoords[0]!.y = state.gameSizes.gameHeight / 2;
      state.applePos = getRandomApplePos(
        state.snakeCoords,
        state.gameSizes.gameWidth,
        state.gameSizes.gameHeight,
        state.gameSizes.itemSize
      );
    },
    startSnakeMovement: (
      state,
      action: PayloadAction<IsnakeSliceState["currentKey"]>
    ) => {
      state.currentKey = action.payload;
      state.isSnakeReadyToMove = true;
      state.isArrowsTempShown = false;
    },
    setGameOver: (state) => {
      state.isGameOver = true;
      state.isGameStarted = false;
      state.isSnakeReadyToMove = false;

      state.isUIShown = true;
    },
    setSnakeNewCoords: (state, action) => {
      state.snakeCoords = action.payload;
    },
    setRandomApplePos: (
      state,
      action: PayloadAction<IsnakeSliceState["applePos"]>
    ) => {
      state.applePos = action.payload;
    },
    setSnakeDir: (state, action) => {
      state.snakeDir = action.payload;
    },
    setCurrentKey: (
      state,
      action: PayloadAction<IsnakeSliceState["currentKey"]>
    ) => {
      state.currentKey = action.payload;
    },
    setTriggerToRunGameLogic: (state) => {
      state.triggerToRunGameLogic = !state.triggerToRunGameLogic;
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
  startSnakeMovement,
  setTriggerToRunGameLogic,
} = snakeSlice.actions;

export default snakeSlice.reducer;
