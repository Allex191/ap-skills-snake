import { snakeKeyPressListener } from "Redux/middleware/snakeKeyPressListener";
import { snakeMovementListener } from "Redux/middleware/snakeMovementListener";
import { snakePointsListener } from "Redux/middleware/snakePointsListener";

export const startListeners = () => {
  snakeMovementListener();
  snakeKeyPressListener();
  snakePointsListener();
};
