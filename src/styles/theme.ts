import { RootState } from "Redux/redux";

const themeLight = {
  colors: {
    primary: "#ffffff",
    secondary: "#000000",
    // uIBackgroundColor: "#fff200",
  },
};

const themeDark = {
  colors: {
    primary: "black",
    secondary: "white",
    // uIBackgroundColor: "#E7E6D1",
  },
};

export const getCurrentTheme = (isDark: RootState["viewReducer"]["isDark"]) => {
  return isDark ? themeDark : themeLight;
};
