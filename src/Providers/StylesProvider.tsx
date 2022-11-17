import { Global, ThemeProvider } from "@emotion/react";
import { useSelector } from "react-redux";
import { RootState } from "Redux/redux";
import { GlobalStyle } from "styles/GlobalStyle";
import { getCurrentTheme } from "styles/theme";

export const StylesProvider = ({ children }) => {
  const { isDark } = useSelector((state: RootState) => state.viewReducer);

  return (
    <ThemeProvider theme={getCurrentTheme(isDark)}>
      <Global styles={GlobalStyle} />
      {children}
    </ThemeProvider>
  );
};
