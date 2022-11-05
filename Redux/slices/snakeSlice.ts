import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  isArrowsTempShown: boolean;
  applePos: TCanvasItemShape[];
  snakeDir: DIR_TYPES;
  currentKey: DIR_TYPES;
  triggerToRunGameLogic: boolean;
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
      action: PayloadAction<CounterState["currentKey"]>
    ) => {
      state.currentKey = action.payload;
      state.gameSpeed = GAME_SPEED;
      state.isArrowsTempShown = false;
    },
    setGameOver: (state) => {
      state.isGameOver = true;
      state.isGameStarted = false;
      state.gameSpeed = null;
      state.isUIShown = true;
    },
    setSnakeNewCoords: (state, action) => {
      state.snakeCoords = action.payload;
    },
    setRandomApplePos: (
      state,
      action: PayloadAction<CounterState["applePos"]>
    ) => {
      state.applePos = action.payload;
    },
    setSnakeDir: (state, action) => {
      state.snakeDir = action.payload;
    },
    setCurrentKey: (
      state,
      action: PayloadAction<CounterState["currentKey"]>
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
