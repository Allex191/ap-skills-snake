import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { DIR_DOWN, DIR_LEFT, DIR_RIGHT, DIR_UP } from "data/constants";
import { useEffect } from "react";
import { AnyAction, Dispatch } from "redux";
import { CounterState } from "Redux/slices/snakeSlice";

interface IuseKeyHandler {
  (
    snakeDir: CounterState["snakeDir"],
    setCurrentKey: ActionCreatorWithPayload<string, string>,
    startSnakeMovement: ActionCreatorWithPayload<string, string>,
    isGameStarted: CounterState["isGameStarted"],
    dispatch: Dispatch<AnyAction>,
    isArrowsTempShown: CounterState["isArrowsTempShown"]
  );
}

export const useKeyHandler: IuseKeyHandler = (
  snakeDir,
  setCurrentKey,
  startSnakeMovement,
  isGameStarted,
  dispatch,
  isArrowsTempShown
) => {
  useEffect(() => {
    const keysHandler = (ev: KeyboardEvent) => {
      if (isGameStarted) {
        const moveUp = ev.key === "w" || ev.key === "ArrowUp";
        const moveDown = ev.key === "s" || ev.key === "ArrowDown";
        const moveLeft = ev.key === "a" || ev.key === "ArrowLeft";
        const moveRight = ev.key === "d" || ev.key === "ArrowRight";

        if (snakeDir === DIR_UP || snakeDir === DIR_DOWN) {
          if (moveLeft) {
            dispatch(setCurrentKey(DIR_LEFT));
          }
          if (moveRight) {
            dispatch(setCurrentKey(DIR_RIGHT));
          }
        }
        if (snakeDir === DIR_LEFT || snakeDir === DIR_RIGHT) {
          if (moveUp) {
            dispatch(setCurrentKey(DIR_UP));
          }
          if (moveDown) {
            dispatch(setCurrentKey(DIR_DOWN));
          }
        }

        if (isArrowsTempShown) {
          const startingMov = moveUp
            ? DIR_UP
            : moveRight
            ? DIR_RIGHT
            : moveDown
            ? DIR_DOWN
            : null;
          startingMov && dispatch(startSnakeMovement(startingMov));
        }
      }
    };
    document.addEventListener("keydown", keysHandler);

    return () => document.removeEventListener("keydown", keysHandler);
  }, [
    snakeDir,
    dispatch,
    isGameStarted,
    setCurrentKey,
    isArrowsTempShown,
    startSnakeMovement,
  ]);
};
