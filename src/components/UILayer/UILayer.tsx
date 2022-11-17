import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "Redux/redux";
import { startGame } from "Redux/slices/snakeSlice";
import { StyledUILayer } from "components/UILayer/UILayer.styled";
import { useDefaultDarkMode as useDefaultDeviceTheme } from "hooks/useDefaultDarkMode";

const UILayer = () => {
  const dispatch = useDispatch();

  const {
    isGameOver,
    isUIShown,
    isArrowsTempShown: isStartArrowsShown,
  } = useSelector((state: RootState) => state.snakeReducer);

  const { uISize } = useSelector((state: RootState) => state.viewReducer);

  useDefaultDeviceTheme();

  return (
    <StyledUILayer uISize={uISize} className="UILayer">
      {isGameOver && <h1>Game Over</h1>}
      {isUIShown && (
        <div style={{ backgroundColor: "white " }}>
          <h1>Snake Game</h1>
          <button id="start" onClick={() => dispatch(startGame())}>
            Start
          </button>
        </div>
      )}
      {isStartArrowsShown && (
        <div>
          <h1 style={{ color: "white" }}>wasd</h1>
        </div>
      )}
    </StyledUILayer>
  );
};

export default UILayer;
