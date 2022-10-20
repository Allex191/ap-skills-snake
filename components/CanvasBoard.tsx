import {
  DIR_DOWN,
  DIR_LEFT,
  DIR_RIGHT,
  DIR_TYPES,
  DIR_UP,
  GAME_HEIGHT,
  GAME_SPEED,
  GAME_WIDTH,
  initialSnakeCoords,
  ITEM_SIZE,
} from "data/constants";
import { useInterval } from "hooks/useInterval";
import { useKeyHandler } from "hooks/useKeyHandler";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "Redux/redux";
import { setGameOver, startGameR } from "Redux/slices/snakeSlice";
import {
  chechIfSnakeCollided,
  checkIsAppleConsumed,
  clearBoard,
  drawObject,
  getRandomApplePos,
  IObjectBody,
} from "utils/utils";

const SnakeTestC = () => {
  const { isGameStarted, isGameOver, gameSpeed } = useSelector(
    (state: RootState) => state.snakeReducer
  );
  const dispatch = useDispatch();

  const [snake, setSnake] = useState(initialSnakeCoords);
  const [snakeDir, setSnakeDir] = useState<DIR_TYPES>(DIR_RIGHT);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [currentKey, setCurrentKey] = useState<DIR_TYPES>(DIR_RIGHT);
  const [applePos, setApplePos] = useState<null | IObjectBody[]>(null);

  const getNextHeadPos = useCallback(() => {
    const snakeMoves = {
      [DIR_UP]: { x: snake[0]!.x, y: snake[0]!.y - ITEM_SIZE },
      [DIR_LEFT]: { x: snake[0]!.x - ITEM_SIZE, y: snake[0]!.y },
      [DIR_DOWN]: { x: snake[0]!.x, y: snake[0]!.y + ITEM_SIZE },
      [DIR_RIGHT]: { x: snake[0]!.x + ITEM_SIZE, y: snake[0]!.y },
    };
    return [snakeMoves[currentKey]];
  }, [snake, currentKey]);

  // const gameSpeed = isGameStarted ? GAME_SPEED : null;

  //start game loop when speed is non null
  useInterval(gameLoop, gameSpeed);
  useKeyHandler(snakeDir, setCurrentKey, isGameStarted, dispatch);

  //set Initial item coords
  useEffect(() => {
    if (!isGameStarted) {
      setSnake(initialSnakeCoords);
      setCurrentKey(DIR_RIGHT);
    }

    applePos === null && setApplePos(getRandomApplePos());
  }, [applePos, isGameStarted, gameSpeed]);

  //draw on canvas
  useEffect(() => {
    if (canvasRef.current) {
      !context && setContext(canvasRef.current.getContext("2d"));
      clearBoard(context);
      applePos && drawObject(context, applePos, "red");
      drawObject(context, snake, "black");
    }
  }, [snake, context, applePos]);

  function gameLoop() {
    const newHeadPosition = getNextHeadPos();
    const isSnakeCollided = chechIfSnakeCollided(newHeadPosition, snake);
    if (isSnakeCollided) {
      dispatch(setGameOver());
      return;
    }
    const isAppleConsumed = checkIsAppleConsumed(newHeadPosition, applePos);
    const newSnakeArr = [...newHeadPosition, ...snake];

    if (isAppleConsumed) {
      setApplePos(getRandomApplePos(snake));
    } else {
      newSnakeArr.length !== 0 && newSnakeArr.pop();
    }
    setSnake(newSnakeArr);
    setSnakeDir(currentKey);
  }

  return (
    <div>
      {isGameOver && <h2>Game Over</h2>}
      <canvas
        ref={canvasRef}
        style={{ border: "2px solid black" }}
        width={GAME_WIDTH}
        height={GAME_HEIGHT}
      />
      {!isGameStarted && <h2>Press space or start to start the game</h2>}
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

export default SnakeTestC;
