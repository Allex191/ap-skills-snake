import React, { useEffect, useState, useRef } from "react";

const TestComponent2 = () => {
  const [colorState, setColorState] = useState("green");
  const [count, setCount] = useState(0);

  const intervalRef = useRef<null | NodeJS.Timer>(null);

  // variable to store our intervalID

  function changeColor() {
    // check if an interval has already been set up
    if (!intervalRef.current) {
      intervalRef.current = setInterval(flashText, 1000);
    }
  }

  console.log(intervalRef.current);

  function stopTextColor() {
    clearInterval(intervalRef.current as NodeJS.Timeout);
    // release our intervalID from the variable
    intervalRef.current = null;
  }

  function flashText() {
    setColorState((prev) => (prev === "green" ? "red" : "green"));
    setCount((prev) => ++prev);
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
      <div id="my_box" style={{ color: colorState }}>
        <h1>{count}</h1>
      </div>
      <button id="start" onClick={() => changeColor()}>
        Start
      </button>
      <button id="stop" onClick={() => stopTextColor()}>
        Stop
      </button>
    </div>
  );
};

export default TestComponent2;
