import { changeSpeedOption } from "Redux/slices/snakeSlice";
import { changeThemeMode } from "Redux/slices/viewSlice";

export const GAME_OPTIONS = [
  {
    title: "Speed",
    images: [
      { src: "/turtle.svg", value: 500 },
      { src: "/me.svg", value: 250 },
      { src: "/chetah.svg", value: 100 },
    ],
    action: (value) => changeSpeedOption(value),
  },
  {
    title: "theme",
    images: [
      { src: "/sun.svg", value: true },
      { src: "/moon.svg", value: false },
    ],
    action: (value) => changeThemeMode(value),
  },
];
