import {
  GAME_HEIGHT,
  GAME_SPEED,
  GAME_WIDTH,
  initialSnakeCoords,
  ITEM_SIZE,
} from "data/constants";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "Redux/redux";
import { startCounterR, startGameR } from "Redux/slices/snakeSlice";
import { useInterval } from "usehooks-ts";
import {
  clearBoard,
  drawObject,
  getRandomApplePos,
  IObjectBody,
} from "utils/utils";

const useInterval2 = (callback: () => void, interval: number | null) => {
  const state = useRef<() => void>();

  useImperativeHandle(state, () => callback, [callback]);

  useEffect(() => {
    if (interval == null) {
      return;
    }

    const intervalHandle = setInterval(() => {
      state.current && state.current();
    }, interval);

    return () => clearInterval(intervalHandle);
  }, [interval]);
};

const DIR_UP = "up";
const DIR_LEFT = "left";
const DIR_DOWN = "down";
const DIR_RIGHT = "right";

type DIR_TYPES =
  | typeof DIR_UP
  | typeof DIR_LEFT
  | typeof DIR_DOWN
  | typeof DIR_RIGHT;

const SnakeTestC = () => {
  const isGameStarted = useSelector(
    (state: RootState) => state.snakeReducer.isGameStarted
  );
  const dispatch = useDispatch();

  const [snake, setSnake] = useState(initialSnakeCoords);
  const [snakeDir, setSnakeDir] = useState<DIR_TYPES>(DIR_RIGHT);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [currentKey, setCurrentKey] = useState<DIR_TYPES>(DIR_RIGHT);
  const [applePos, setApplePos] = useState<null | IObjectBody[]>(null);
  const [isAppleConsumed, setIsAppleConsumed] = useState(false);

  const getNextHeadPos = useCallback(() => {
    const snakeMoves = {
      [DIR_UP]: { x: snake[0]!.x, y: snake[0]!.y - ITEM_SIZE },
      [DIR_LEFT]: { x: snake[0]!.x - ITEM_SIZE, y: snake[0]!.y },
      [DIR_DOWN]: { x: snake[0]!.x, y: snake[0]!.y + ITEM_SIZE },
      [DIR_RIGHT]: { x: snake[0]!.x + ITEM_SIZE, y: snake[0]!.y },
    };
    return [snakeMoves[currentKey]];
  }, [snake, currentKey]);

  const gameSpeed = isGameStarted ? GAME_SPEED : null;

  //start game loop when speed is non null
  useInterval2(gameLoop, gameSpeed);

  //set Initial item coords
  useEffect(() => {
    if (!isGameStarted) {
      setSnake(initialSnakeCoords);
      setCurrentKey(DIR_RIGHT);
    }
    applePos === null && setApplePos(getRandomApplePos());
  }, [applePos, isGameStarted]);

  //draw on canvas
  useEffect(() => {
    if (canvasRef.current) {
      !context && setContext(canvasRef.current.getContext("2d"));
      clearBoard(context);
      applePos && drawObject(context, applePos, "red");
      drawObject(context, snake, "black");
    }
  }, [snake, context, applePos]);

  // put in game loop draw canvas

  function gameLoop() {
    const checkAppleCollision = (headPos, applePos, setIsAppleConsumed) => {
      if (headPos[0].x === applePos[0].x && headPos[0].y === applePos[0].y) {
        setIsAppleConsumed(true);
      }
    };
    setIsAppleConsumed(false);
    const newHeadPosition = getNextHeadPos();
    checkAppleCollision(newHeadPosition, applePos, setIsAppleConsumed);
    const newSnakeArr = [...newHeadPosition, ...snake];
    if (isAppleConsumed) {
      setApplePos(getRandomApplePos(snake));
    } else {
      newSnakeArr.length !== 0 && newSnakeArr.pop();
    }
    setSnake(newSnakeArr);
    setSnakeDir(currentKey);
  }

  //keyhandler
  useEffect(() => {
    const handleDesktopKeys = (ev: KeyboardEvent) => {
      if (ev.key === " " && !isGameStarted) {
        dispatch(startGameR());
        dispatch(startCounterR());
      }

      if (isGameStarted) {
        const moveUp = ev.key === "w" || ev.key === "ArrowUp";
        const moveDown = ev.key === "s" || ev.key === "ArrowDown";
        const moveLeft = ev.key === "a" || ev.key === "ArrowLeft";
        const moveRight = ev.key === "d" || ev.key === "ArrowRight";

        if (snakeDir === DIR_UP || snakeDir === DIR_DOWN) {
          if (moveLeft) {
            setCurrentKey(DIR_LEFT);
          }
          if (moveRight) {
            setCurrentKey(DIR_RIGHT);
          }
        }
        if (snakeDir === DIR_LEFT || snakeDir === DIR_RIGHT) {
          if (moveUp) {
            setCurrentKey(DIR_UP);
          }
          if (moveDown) {
            setCurrentKey(DIR_DOWN);
          }
        }
      }
    };
    document.addEventListener("keydown", handleDesktopKeys);

    return () => document.removeEventListener("keydown", handleDesktopKeys);
  }, [snakeDir, dispatch, isGameStarted]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{ border: "2px solid black" }}
        width={GAME_WIDTH}
        height={GAME_HEIGHT}
      />
      {!isGameStarted && <h2>Press space or start to start the game</h2>}
    </div>
  );
};

export default SnakeTestC;
