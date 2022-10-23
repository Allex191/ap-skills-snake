import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "Redux/redux";
import { startGameR } from "Redux/slices/snakeSlice";

const UILayer = () => {
  // const { isGameStarted } = useSelector(
  //   (state: RootState) => state.snakeReducer
  // );

  const dispatch = useDispatch();
  return (
    <div className="UILayer">
      {" "}
      {/* {!isGameStarted && <h2>Press space or start to start the game</h2>} */}
      <button
        style={{ width: "100px", height: "100px" }}
        id="start"
        onClick={() => dispatch(startGameR())}
      >
        Start
      </button>
    </div>
  );
};

export default UILayer;
