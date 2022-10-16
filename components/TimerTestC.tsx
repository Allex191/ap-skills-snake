import { GAME_SPEED } from "data/constants";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "Redux/redux";
import {
  resetCounterR,
  startCounterR,
  startGameR,
  stopGameR,
} from "Redux/slices/snakeSlice";

const TestComponent2 = () => {
  // const [colorState, setColorState] = useState("green");
  // const [count, setCount] = useState(0);
  const counter = useSelector((state: RootState) => state.snakeReducer.counter);
  const dispatch = useDispatch();

  const intervalRef = useRef<null | NodeJS.Timer>(null);

  // variable to store our intervalID

  function changeColor() {
    // check if an interval has already been set up
    if (!intervalRef.current) {
      intervalRef.current = setInterval(loop, GAME_SPEED);
    }
  }

  function resetInterval() {
    clearInterval(intervalRef.current as NodeJS.Timeout);
    // release our intervalID from the variable
    intervalRef.current = null;
  }

  // function pauseCounter() {
  //   resetInterval();
  // }

  function loop() {
    dispatch(startCounterR());
    dispatch(startGameR());
  }

  function resetCounter() {
    dispatch(resetCounterR());
    resetInterval();
    dispatch(stopGameR());
  }

  return (
    <div
      className="TestComponent2"
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        transform: "scale(2)",
      }}
    >
      <div id="my_box" style={{ color: counter.color }}>
        <h1>{counter.number}</h1>
      </div>
      <button id="start" onClick={() => changeColor()}>
        Start
      </button>
      {/* <button id="pause" onClick={() => pauseCounter()}>
        Pause
      </button> */}
      <button id="reset" onClick={() => resetCounter()}>
        Reset
      </button>
    </div>
  );
};

export default TestComponent2;
