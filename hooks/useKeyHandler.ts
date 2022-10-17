import { DIR_DOWN, DIR_LEFT, DIR_RIGHT, DIR_UP } from "data/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "Redux/redux";
import { startCounterR, startGameR } from "Redux/slices/snakeSlice";

export const useKeyHandler = (snakeDir, setCurrentKey) => {
  const dispatch = useDispatch();
  const isGameStarted = useSelector(
    (state: RootState) => state.snakeReducer.isGameStarted
  );
  useEffect(() => {
    const keysHandler = (ev: KeyboardEvent) => {
      if (ev.key === " " && !isGameStarted) {
        dispatch(startGameR());
        dispatch(startCounterR());
      }

      if (isGameStarted) {
        const moveUp = ev.key === "w" || ev.key === "ArrowUp";
        const moveDown = ev.key === "s" || ev.key === "ArrowDown";
        const moveLeft = ev.key === "a" || ev.key === "ArrowLeft";
        const moveRight = ev.key === "d" || ev.key === "ArrowRight";

        if (snakeDir === DIR_UP || snakeDir === DIR_DOWN) {
          if (moveLeft) {
            setCurrentKey(DIR_LEFT);
          }
          if (moveRight) {
            setCurrentKey(DIR_RIGHT);
          }
        }
        if (snakeDir === DIR_LEFT || snakeDir === DIR_RIGHT) {
          if (moveUp) {
            setCurrentKey(DIR_UP);
          }
          if (moveDown) {
            setCurrentKey(DIR_DOWN);
          }
        }
      }
    };
    document.addEventListener("keydown", keysHandler);

    return () => document.removeEventListener("keydown", keysHandler);
  }, [snakeDir, dispatch, isGameStarted, setCurrentKey]);
};
