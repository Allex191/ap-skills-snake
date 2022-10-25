import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "Redux/redux";
import { startGame } from "Redux/slices/snakeSlice";
import { StyledUILayer } from "components/index.styled";

const UILayer = () => {
  const { isGameOver, isGameStarted } = useSelector(
    (state: RootState) => state.snakeReducer
  );

  const dispatch = useDispatch();
  return (
    <StyledUILayer className="UILayer">
      {isGameOver && <h2>Game Over</h2>}

      {!isGameStarted && (
        <button
          style={{ width: "100px", height: "100px" }}
          id="start"
          onClick={() => dispatch(startGame())}
        >
          Start
        </button>
      )}
    </StyledUILayer>
  );
};

export default UILayer;
