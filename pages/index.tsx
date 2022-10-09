import CanvasBoard from "components/CanvasBoard";
import TestComponent from "components/TestComponent";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>A.P. Skills snake</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>A.P. Skills snake</h1>
      <CanvasBoard width={1000} height={600} />
      <TestComponent />
    </>
  );
}
