import { Global, ThemeProvider } from "@emotion/react";
import { useSelector } from "react-redux";
import { RootState } from "Redux/redux";
import { GlobalStyle } from "styles/GlobalStyle";
import { getCurrentTheme } from "styles/theme";

export const StylesProvider = ({ children }) => {
  const { isDark, uIItemsScale } = useSelector(
    (state: RootState) => state.viewReducer
  );

  const modifiedTheme = { ...getCurrentTheme(isDark), uIItemsScale };

  return (
    <ThemeProvider theme={modifiedTheme}>
      <Global styles={GlobalStyle} />
      {children}
    </ThemeProvider>
  );
};
