import { TOUCH_MOVES_TRESHOLD } from "data/gameConst";
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

    let prevX: null | number = null;
    let prevY: null | number = null;

    const initializeTouchXY = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        prevX = event.touches[0]?.clientX || null;
        prevY = event.touches[0]?.clientY || null;
      }
    };

    const touchMovesHandler = (event: TouchEvent) => {
      const directions: Idirections = {
        moveUp: false,
        moveDown: false,
        moveLeft: false,
        moveRight: false,
      };

      let curX: null | number = null;
      let curY: null | number = null;

      if (event.touches.length === 1) {
        curX = event.touches[0]?.clientX || null;
        curY = event.touches[0]?.clientY || null;
      }

      if (curX === null || curY === null) return;
      if (prevX === null || prevY === null) {
        prevX = curX;
        prevY = curX;
        return;
      }

      const difY = prevY - curY;
      const difX = prevX - curX;
      const difXAbs = Math.abs(difX);
      const difYAbs = Math.abs(difY);

      if (difXAbs < TOUCH_MOVES_TRESHOLD && difYAbs < TOUCH_MOVES_TRESHOLD)
        return;

      if (difXAbs > difYAbs) {
        if (prevX < curX) {
          directions.moveRight = true;
        } else {
          directions.moveLeft = true;
        }
      }

      if (difXAbs < difYAbs) {
        if (prevY < curY) {
          directions.moveDown = true;
        } else {
          directions.moveUp = true;
        }
      }
      prevX = curX;
      prevY = curY;

      dispatch(userPressedMoveSnakeKey(directions));
    };

    document.addEventListener("keydown", keysHandler);
    document.addEventListener("touchmove", touchMovesHandler);
    document.addEventListener("touchstart", initializeTouchXY);

    // add handler for touch start event and initialise arrMoves array
    return () => {
      document.removeEventListener("keydown", keysHandler);
      document.removeEventListener("touchmove", touchMovesHandler);
    };
  }, []);
};
