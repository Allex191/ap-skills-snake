import { useEffect } from "react";
import { AnyAction, Dispatch } from "redux";
import { userPressedMoveSnakeKey } from "Redux/actions/actions";

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
  console.log("dispatch", dispatch);
  useEffect(() => {
    const keysHandler = (ev: KeyboardEvent) => {
      const directions: Idirections = {
        moveUp: ev.key === "w" || ev.key === "ArrowUp",
        moveDown: ev.key === "s" || ev.key === "ArrowDown",
        moveLeft: ev.key === "a" || ev.key === "ArrowLeft",
        moveRight: ev.key === "d" || ev.key === "ArrowRight",
      };
      dispatch(userPressedMoveSnakeKey(directions));
    };
    document.addEventListener("keydown", keysHandler);

    return () => document.removeEventListener("keydown", keysHandler);
  }, [dispatch]);
};
