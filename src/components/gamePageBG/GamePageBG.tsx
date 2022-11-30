import { TOUCH_MOVES_TRESHOLD } from "data/gameConst";
import { Idirections } from "hooks/useKeysHandler";
import React from "react";
import { useDispatch } from "react-redux";
import { userPressedMoveSnakeKey } from "Redux/middleware/manageUserMoveSnakeKey";

import * as Styled from "components/gamePageBG/GamePageBG.styled";

const GamePageBG = () => {
  const dispatch = useDispatch();

  let prevX: null | number = null;
  let prevY: null | number = null;

  const initializeTouchXY = (event: React.TouchEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log(event);
    if (event.touches.length === 1) {
      prevX = event.touches[0]?.clientX || null;
      prevY = event.touches[0]?.clientY || null;
    }
  };

  const touchMovesHandler = (event: React.TouchEvent<HTMLDivElement>) => {
    event.preventDefault();

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

  return (
    <Styled.pageBg>
      <Styled.pageImg src="grass.jpg" />
      <Styled.touchZone
        onTouchMove={(event) => touchMovesHandler(event)}
        onTouchStart={(event) => initializeTouchXY(event)}
      />
    </Styled.pageBg>
  );
};

export default GamePageBG;
