import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  FIRST_IMAGE_ARR_ID,
  ImageIdArr,
  SECOND_IMAGE_ARR_ID,
} from "data/canvasImages";
import {
  DIR_RIGHT,
  DIR_TYPES,
  GAME_HEIGHT,
  GAME_SPEED,
  GAME_WIDTH,
  ITEM_SIZE,
} from "data/constants";
import { getAllImagesId } from "utils/getAllImagesId";
import { getRandomApplePos, CanvasItemShape } from "utils/utils";

export interface SnakeSliceState {
  isUIShown: boolean;
  isGameStarted: boolean;
  isGameOver: null | boolean;
  gameSpeed: null | number;
  gameSizes: {
    gameWidth: number;
    gameHeight: number;
    itemSize: number;
  };
  snakeCoords: CanvasItemShape[];
  isSnakeReadyToMove: boolean;
  isArrowsTempShown: boolean;
  applePos: CanvasItemShape[];
  snakeDir: DIR_TYPES;
  currentKey: DIR_TYPES;
  triggerToRunGameLogic: boolean;
  skillsImagesData: {
    allSkillsImages: ImageIdArr;
    spawnedImage: ImageIdArr;
    collectedImages: ImageIdArr;
  };
}

const initialState: SnakeSliceState = {
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
  skillsImagesData: {
    allSkillsImages: getAllImagesId(),
    spawnedImage: SECOND_IMAGE_ARR_ID,
    collectedImages: FIRST_IMAGE_ARR_ID,
  },
};

export const snakeSlice = createSlice({
  name: "snake",
  initialState,
  reducers: {
    startGame: (state) => {
      const middleOfScreen =
        state.gameSizes.itemSize *
        Math.floor(state.gameSizes.gameWidth / state.gameSizes.itemSize / 2);

      state.snakeCoords[0]!.x = middleOfScreen;
      state.snakeCoords[0]!.y = middleOfScreen;

      state.isGameStarted = true;
      state.isGameOver = false;
      state.isUIShown = false;
      state.isArrowsTempShown = true;

      state.applePos = getRandomApplePos(
        state.snakeCoords,
        state.gameSizes.gameWidth,
        state.gameSizes.gameHeight,
        state.gameSizes.itemSize
      );

      state.skillsImagesData.collectedImages = FIRST_IMAGE_ARR_ID;
      state.skillsImagesData.spawnedImage = SECOND_IMAGE_ARR_ID;
    },
    startSnakeMovement: (
      state,
      action: PayloadAction<SnakeSliceState["currentKey"]>
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
      action: PayloadAction<SnakeSliceState["applePos"]>
    ) => {
      state.applePos = action.payload;
    },
    setSnakeDir: (state, action) => {
      state.snakeDir = action.payload;
    },
    setCurrentKey: (
      state,
      action: PayloadAction<SnakeSliceState["currentKey"]>
    ) => {
      state.currentKey = action.payload;
    },
    setTriggerToRunGameLogic: (state) => {
      state.triggerToRunGameLogic = !state.triggerToRunGameLogic;
    },
    updateSkillsImages: (state) => {
      const collectedImages = state.skillsImagesData.collectedImages;
      const spawnedImageArr = state.skillsImagesData.spawnedImage;
      const allSkillsImages = state.skillsImagesData.allSkillsImages;
      const indexToMatchNextImage = state.snakeCoords.length + 1;
      const snakeLength = state.snakeCoords.length;

      collectedImages.push(spawnedImageArr[0]!);

      console.log("snakeLength", snakeLength);
      console.log("allSkillsImagesLength", allSkillsImages.length);

      if (snakeLength >= allSkillsImages.length - 1) {
        console.log("snake bigger it is running");
        spawnedImageArr[0] = allSkillsImages[allSkillsImages.length - 1]!;
      } else {
        spawnedImageArr[0] = allSkillsImages[indexToMatchNextImage]!;
      }
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
  updateSkillsImages,
} = snakeSlice.actions;

export default snakeSlice.reducer;
