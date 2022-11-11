import { userPressedMoveSnakeKey } from "Redux/middleware/manageUserMoveSnakeKey";
import { moveSnake } from "Redux/middleware/startSnakeLogic";
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
