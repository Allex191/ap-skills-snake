import { createSlice } from "@reduxjs/toolkit";

type ScoreState = {
  currentScore: number;
  prevScore: number;
  highScore: number;
};

const initialState: ScoreState = {
  currentScore: 0,
  prevScore: 0,
  highScore: 0,
};

export const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    setCurrentScore: (state, action) => {
      state.currentScore = action.payload;
    },

    setPrevScore: (state, action) => {
      state.prevScore = action.payload;
    },

    setHighScore: (state, action) => {
      state.highScore = action.payload;
    },
  },
});

export const { setCurrentScore, setPrevScore, setHighScore } =
  scoreSlice.actions;

export default scoreSlice.reducer;
