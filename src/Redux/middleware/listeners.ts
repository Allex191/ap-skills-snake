import { moveSnake } from "Redux/actions/actions";
import { startAppListening } from "./listenerMiddleware";
import { startSnakeLogic } from "./startSnakeLogic";

export const startListeners = () =>
  startAppListening({
    actionCreator: moveSnake,
    effect: startSnakeLogic,
  });
