import CanvasBoard from "components/CanvasBoard";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>A.P. Skills snake</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>A.P. Skills snake</h1>
      <CanvasBoard />
    </>
  );
}
