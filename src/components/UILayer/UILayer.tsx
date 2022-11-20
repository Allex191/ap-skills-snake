import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "Redux/redux";
import { startGame } from "Redux/slices/snakeSlice";
import * as St from "components/UILayer/UILayer.styled";
import { useDefaultDarkMode as useDefaultDeviceTheme } from "hooks/useDefaultDarkMode";
import Settings from "components/UILayer/Settings";

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
    <St.uILayer uISize={uISize}>
      {isStartArrowsShown && <St.navigationHint>wasd</St.navigationHint>}

      <St.menu uISize={uISize} isShow={isGameOver || isUIShown}>
        <St.menuInner>
          <St.gameTitle>Snake Game</St.gameTitle>
          {isGameOver && (
            <St.gameOver>
              <St.gameOverTitle>You have learned 200 hours.</St.gameOverTitle>
              <St.gameOverHint>
                *Learn more to get a job.
              </St.gameOverHint>
            </St.gameOver>
          )}
          <St.stats>
            <St.statsIcon>
              <St.statsIconImg src="/stats.svg" />
            </St.statsIcon>
            <St.score>
              <St.scoreCurrent>Last Score:200h</St.scoreCurrent>
              <St.scoreHigh>High Score:1000h</St.scoreHigh>
            </St.score>
          </St.stats>
          <Settings />
          <St.startButton id="start" onClick={() => dispatch(startGame())}>
            Start
          </St.startButton>
        </St.menuInner>
      </St.menu>
    </St.uILayer>
  );
};

export default UILayer;
