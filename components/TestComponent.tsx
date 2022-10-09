import React, { useCallback, useEffect, useRef, useState } from "react";

const TestComponent = () => {
  const [count, setCount] = useState(0);

  const timerRef = useRef<null | TimerHandler>(null);

  const timer = useCallback(() => {
    setInterval(() => {
      setCount((prev) => ++prev);
    }, 1000);
  }, []);


  useEffect(() => {
    // if (timerRef.current) {
    timerRef.current = timer;
    timerRef.current();
    console.log(timerRef);
    // }
  }, [timerRef, timer]);

  useEffect(() => {
    console.log(count);
  }, [count]);

  return <h1>Counter:{count}</h1>;
};

export default TestComponent;
