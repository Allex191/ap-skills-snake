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

  const { currentScore } = useSelector(
    (state: RootState) => state.scoreReducer
  );
  const currentScoreNoDecimal = Math.floor(currentScore);
  const remainingScoreTillFinal = Math.floor(
    TOTAL_HOURS_TILL_JOB - currentScore
  );
  console.log("rendering");

  const { uISize, canvasLayersSize } = useSelector(
    (state: RootState) => state.viewReducer
  );

  useDefaultDeviceTheme();

  return (
    <St.uILayer uISize={uISize} canvasLayersSize={canvasLayersSize}>
      {isStartArrowsShown && <St.navigationHint>WASD</St.navigationHint>}
      {isGameStarted && (
        <St.currentScoreArea>
          Hours: {currentScoreNoDecimal}
        </St.currentScoreArea>
      )}

      <St.menu uISize={uISize} isShow={isGameOver || isUIShown || isGameWin}>
        <St.menuInner>
          <St.gameTitle>A.P Skills Snake</St.gameTitle>
          {isGameOver && (
            <St.gameOver>
              <St.gameOverTitle>
                You have learned {currentScoreNoDecimal} hours.
              </St.gameOverTitle>
              <St.gameOverHint>
                *Learn {remainingScoreTillFinal} hours more to get a job.
              </St.gameOverHint>
            </St.gameOver>
          )}
          {isGameWin && <div>Congrats now you have your dream job</div>}
          <St.stats>
            <St.statsIcon>
              <St.statsIconImg src="/stats.svg" />
            </St.statsIcon>
            <St.score>
              <St.scoreCurrent>Previous Score: x h</St.scoreCurrent>
              <St.scoreHigh>High Score: xx h</St.scoreHigh>
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
