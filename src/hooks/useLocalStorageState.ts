import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { storageScoreListener } from "Redux/middleware/storageScoreListener";
import { setHighScore, setPrevScore } from "Redux/slices/scoreSlice";

const HIGH_SCORE = "HIGH_SCORE";
const PREV_SCORE = "PREV_SCORE";

export const useLocalStorageState = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!localStorage) return;

    const saveScoresToLocalStorage = ({ highScore, prevScore }) => {
      localStorage.setItem(HIGH_SCORE, highScore);
      localStorage.setItem(PREV_SCORE, prevScore);
    };
    const unsubscribe = storageScoreListener(saveScoresToLocalStorage);

    const highScore = localStorage.getItem(HIGH_SCORE) || 0;
    const prevScore = localStorage.getItem(PREV_SCORE) || 0;
    dispatch(setPrevScore(prevScore));
    dispatch(setHighScore(highScore));

    return () => {
      unsubscribe();
    };
  }, []);
};
