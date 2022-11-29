import { useEffect } from "react";
import { AnyAction, Dispatch } from "redux";
import { userPressedMoveSnakeKey } from "Redux/middleware/manageUserMoveSnakeKey";

interface IuseKeysHandler {
  (dispatch: Dispatch<AnyAction>);
}

export interface Idirections {
  moveUp: boolean;
  moveDown: boolean;
  moveLeft: boolean;
  moveRight: boolean;
}

export const useKeysHandler: IuseKeysHandler = (dispatch) => {
  useEffect(() => {
    const keysHandler = (ev: KeyboardEvent) => {
      const directions: Idirections = {
        moveUp: ev.code === "KeyW" || ev.key === "ArrowUp",
        moveDown: ev.code === "KeyS" || ev.key === "ArrowDown",
        moveLeft: ev.code === "KeyA" || ev.key === "ArrowLeft",
        moveRight: ev.code === "KeyD" || ev.key === "ArrowRight",
      };
      dispatch(userPressedMoveSnakeKey(directions));
    };

    document.addEventListener("keydown", keysHandler);

    return () => {
      document.removeEventListener("keydown", keysHandler);
    };
  }, []);
};
