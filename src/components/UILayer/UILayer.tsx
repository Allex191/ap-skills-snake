import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "Redux/redux";
import { startGame } from "Redux/slices/snakeSlice";
import * as St from "components/UILayer/UILayer.styled";
import { useDefaultDarkMode as useDefaultDeviceTheme } from "hooks/useDefaultDarkMode";
import Settings from "components/UILayer/Settings";
import { TOTAL_HOURS_TILL_JOB } from "data/gameConst";

const UILayer = () => {
  const dispatch = useDispatch();

  const {
    isGameOver,
    isGameWin,
    isUIShown,
    isStartArrowsShown,
    isGameStarted,
  } = useSelector((state: RootState) => state.snakeReducer);

  const { currentScore, prevScore, highScore } = useSelector(
    (state: RootState) => state.scoreReducer
  );

  const { uISize, canvasLayersSize } = useSelector(
    (state: RootState) => state.viewReducer
  );

  useDefaultDeviceTheme();

  const getScoreNoDecimal = (score: number) => {
    return score > 0 ? Math.floor(score) : 0;
  };

  return (
    <St.uILayer uISize={uISize} canvasLayersSize={canvasLayersSize}>
      {isStartArrowsShown && <St.navigationHint>WASD</St.navigationHint>}
      {isGameStarted && (
        <St.currentScoreArea>
          Hours: {getScoreNoDecimal(currentScore)}
        </St.currentScoreArea>
      )}

      <St.menu uISize={uISize} isShow={isGameOver || isUIShown || isGameWin}>
        <St.menuInner>
          <St.gameTitle>A.P Skills Snake</St.gameTitle>
          {isGameOver && (
            <St.gameOver>
              <St.gameOverTitle>
                You have learned {getScoreNoDecimal(currentScore)} hours.
              </St.gameOverTitle>
              <St.gameOverHint>
                Can you do {TOTAL_HOURS_TILL_JOB} hours?
              </St.gameOverHint>
            </St.gameOver>
          )}
          {isGameWin && <div>Congrats now you have your dream job</div>}
          <St.stats>
            <St.statsIcon>
              <St.statsIconImg src="/stats.svg" />
            </St.statsIcon>
            <St.score>
              <St.scorePrev>
                Previous Score: {getScoreNoDecimal(prevScore)}h
              </St.scorePrev>
              <St.scoreHigh>
                High Score: {getScoreNoDecimal(highScore)}h
              </St.scoreHigh>
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
