import { createSlice } from "@reduxjs/toolkit";

type ScoreState = {
  currentScore: number;
  previousScore: number;
  highScore: number;
};

const initialState: ScoreState = {
  currentScore: 0,
  previousScore: 0,
  highScore: 0,
};

export const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    setCurrentScore: (state, action) => {
      state.currentScore = action.payload;
    },
  },
});

export const { setCurrentScore } = scoreSlice.actions;

export default scoreSlice.reducer;
