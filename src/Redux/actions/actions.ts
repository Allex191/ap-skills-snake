import { createAction } from "@reduxjs/toolkit";
import { Idirections } from "hooks/useKeysHandler";

export const moveSnake = createAction<undefined>("snake/move");
export const userPressedMoveSnakeKey = createAction<Idirections>(
  "snake/userPressedMoveSnakeKey"
);
