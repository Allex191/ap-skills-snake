import { RootState } from "Redux/redux";

const themeLight = {
  colors: {
    primary: "#ffffff",
    secondary: "#000000",
    uIBackgroundColor: "#E7E6D1",
  },
};

const themeDark = {
  colors: {
    primary: "black",
    secondary: "white",
    uIBackgroundColor: "#323232",
  },
};

export const getCurrentTheme = (isDark: RootState["viewReducer"]["isDark"]) => {
  return isDark ? themeDark : themeLight;
};
