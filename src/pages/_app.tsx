import { AppProps } from "next/app";
import Head from "next/head";
import { StylesProvider } from "Providers/StylesProvider";
import { Provider } from "react-redux";
import { store } from "Redux/redux";

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
      <Provider store={store}>
        <StylesProvider>
          <Component {...pageProps} />
        </StylesProvider>
      </Provider>
    </>
  );
}
