import { userPressedMoveSnakeKey, moveSnake } from "Redux/actions/actions";
import { startAppListening } from "./listenerMiddleware";
import { manageUserMoveSnakeKey } from "./manageUserMoveSnakeKey";
import { startSnakeLogic } from "./startSnakeLogic";

export const startListeners = () => {
  startAppListening({
    actionCreator: moveSnake,
    effect: startSnakeLogic,
  });
  startAppListening({
    actionCreator: userPressedMoveSnakeKey,
    effect: manageUserMoveSnakeKey,
  });

};
