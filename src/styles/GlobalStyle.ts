import { css } from "@emotion/react";
// import "@fontsource/roboto/300.css";
// import "@fontsource/roboto/400.css";
// import "@fontsource/roboto/500.css";
// import "@fontsource/roboto/700.css";
// import "@fontsource/monoton";

export const GlobalStyle = css`
  /* :root {
    //primary font
    --font-family-primary: "monoton", "Times New Roman", Times, serif;
    --title-regular-large: 400 clamp(16px, 5vw, 38px) var(--font-family-primary);
    --title-regular-pre-large: 400 clamp(16px, 6vw, 38px)
      var(--font-family-primary);
    --title-regular-standart: 400 clamp(25px, 5vw, 33px) / 140%
      var(--font-family-primary);
    --title-regular-small: 400 16px / 20px var(--font-family-primary);

    //secondary font
    --font-family-secondary: "roboto", Verdana, sans-serif;
    --text-bold-large: 700 18px /30px var(--font-family-secondary);
    --text-medium-large: 500 22px /100% var(--font-family-secondary);
    --text-regular-pre-large: 400 17px / 25px var(--font-family-secondary);
    --text-regular-standart: 400 16px / 140% var(--font-family-secondary);
    --text-regular-small-bold: 400 15px/17px var(--font-family-secondary);
    --text-regular-small: 400 15px/17px var(--font-family-secondary);
  } */

  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }
  html {
    box-sizing: border-box;
    scroll-behavior: smooth;
    font: var(--text-regular-standart);
  }

  body {
    user-select: text;
    background-color: gray;
  }

  *,
  *::before,
  ::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    position: relative;
  }
`;
