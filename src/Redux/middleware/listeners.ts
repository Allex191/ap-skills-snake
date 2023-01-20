import { snakeKeyPressListener } from "Redux/middleware/snakeKeyPressListener";
import { snakeMovementListener } from "Redux/middleware/snakeMovementListener";
import { snakeScoreListener } from "Redux/middleware/snakeScoreListener";

export const startListeners = () => {
  snakeMovementListener();
  snakeKeyPressListener();
  snakeScoreListener();
};
