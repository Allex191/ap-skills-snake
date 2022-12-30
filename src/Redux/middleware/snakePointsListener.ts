import { AnyAction } from "@reduxjs/toolkit";
import { startAppListening } from "Redux/middleware/listenerMiddleware";

const effect = (arg1: AnyAction, arg2) => {
    console.log(arg1);
    console.log(arg2);
};

export const snakePointsListener = () => {
  startAppListening({
    predicate: (_action, currentState, previousState) => {
      return (
        currentState.snakeReducer.snakeCoords.length !==
        previousState.snakeReducer.snakeCoords.length
      );
    },
    effect,
  });
};
