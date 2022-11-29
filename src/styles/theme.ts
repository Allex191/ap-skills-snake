import { RootState } from "Redux/redux";

const themeLight = {
  colors: {
    primary: "#ffffff",
    secondary: "#000000",
    uIBackground: "#E7E6D1",
    optionsBorder: "#565656",
    buttonStart: "#8a278a",
    pageBg: "#70736e",
  },
};

const themeDark = {
  colors: {
    primary: "black",
    secondary: "#eeeeee",
    uIBackground: "#323232",
    optionsBorder: "#d8d8d8",
    buttonStart: "#8a278a",
    pageBg: "#3b3b3b",
    
  },
};

export const getCurrentTheme = (isDark: RootState["viewReducer"]["isDark"]) => {
  return isDark ? themeDark : themeLight;
};
