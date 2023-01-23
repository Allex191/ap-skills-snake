import { startAppListening } from "Redux/middleware/listenerMiddleware";

export const storageScoreListener = (
  scoreSaveCB: ({ highScore, prevScore }) => void
) => {
  return startAppListening({
    predicate: (_action, currentState, previousState) => {
      return (
        currentState.scoreReducer.highScore !==
          previousState.scoreReducer.highScore ||
        currentState.scoreReducer.prevScore !==
          previousState.scoreReducer.prevScore
      );
    },
    effect: (_arg1, arg2) => {
      const { highScore, prevScore } = arg2.getState().scoreReducer;
      scoreSaveCB({ highScore, prevScore });
    },
  });
};
