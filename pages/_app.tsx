import { GlobalStyle } from "styles/GlobalStyle";

import { AppProps } from "next/app";
import Head from "next/head";
import { Global, ThemeProvider } from "@emotion/react";
import { Provider } from "react-redux";
// import store from "store";

const theme = {
  colors: {
    primary: "black",
    secondary: "white",
  },
};

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      {/* <Provider store={store}> */}
        <ThemeProvider theme={theme}>
          <Global styles={GlobalStyle} />
          <Component {...pageProps} />
        </ThemeProvider>
      {/* </Provider> */}
    </>
  );
}
