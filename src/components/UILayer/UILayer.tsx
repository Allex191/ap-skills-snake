import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "Redux/redux";
import { startGame } from "Redux/slices/snakeSlice";
import * as St from "components/uILayer/UILayer.styled";
import { useDefaultDarkMode as useDefaultDeviceTheme } from "hooks/useDefaultDarkMode";
import Settings from "components/uILayer/Settings";

const UILayer = () => {
  const dispatch = useDispatch();

  const {
    isGameOver,
    isGameWin,
    isUIShown,
    isArrowsTempShown: isStartArrowsShown,
  } = useSelector((state: RootState) => state.snakeReducer);

  const { uISize } = useSelector((state: RootState) => state.viewReducer);

  useDefaultDeviceTheme();

  return (
    <St.uILayer uISize={uISize}>
      {isStartArrowsShown && <St.navigationHint>WASD</St.navigationHint>}

      <St.menu uISize={uISize} isShow={isGameOver || isUIShown || isGameWin}>
        <St.menuInner>
          <St.gameTitle>A.P Skills Snake</St.gameTitle>
          {isGameOver && (
            <St.gameOver>
              <St.gameOverTitle>You have learned x hours.</St.gameOverTitle>
              <St.gameOverHint>*Learn more to get a job.</St.gameOverHint>
            </St.gameOver>
          )}
          {isGameWin && <div>Congrats now you have your dream job</div>}
          <St.stats>
            <St.statsIcon>
              <St.statsIconImg src="/stats.svg" />
            </St.statsIcon>
            <St.score>
              <St.scoreCurrent>Last Score:x h</St.scoreCurrent>
              <St.scoreHigh>High Score:xx h</St.scoreHigh>
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
