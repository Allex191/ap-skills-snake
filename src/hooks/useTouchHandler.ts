import { Dispatch } from "@reduxjs/toolkit";
import { touchZoneRefT } from "components/gamePageBG/GamePageBG";
import { TOUCH_MOVES_TRESHOLD } from "data/gameConst";
import { Idirections } from "hooks/useKeysHandler";
import { MutableRefObject, useEffect } from "react";
import { userPressedMoveSnakeKey } from "Redux/middleware/manageUserMoveSnakeKey";

export const useTouchHandler = (
  touchZoneRef: MutableRefObject<touchZoneRefT>,
  dispatch: Dispatch
) => {
  let prevX: null | number = null;
  let prevY: null | number = null;

  const initializeTouchXY = (event: TouchEvent) => {
    if (event.touches.length === 1) {
      prevX = event.touches[0]?.clientX || null;
      prevY = event.touches[0]?.clientY || null;
    }

    event.preventDefault();
    event.stopPropagation();
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

    event.preventDefault();
    event.stopPropagation();
  };

  useEffect(() => {
    if (touchZoneRef.current) {
      touchZoneRef.current.addEventListener("touchstart", initializeTouchXY, {
        passive: false,
      });
      touchZoneRef.current.addEventListener("touchmove", touchMovesHandler, {
        passive: false,
      });
    }

    return () => {
      if (touchZoneRef.current) {
        touchZoneRef.current.removeEventListener(
          "touchstart",
          initializeTouchXY
        );
        touchZoneRef.current.removeEventListener(
          "touchmove",
          touchMovesHandler
        );
      }
    };
  }, [touchZoneRef, dispatch]);
};
