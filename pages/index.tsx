import BackgroundLayer from "components/BackgroundLayer";
import GameLayer from "components/GameLayer";
import UILayer from "components/UILayer";
import Head from "next/head";
import { StyledContainer } from "styles/Container.styled";

export default function Home() {
  return (
    <>
      <Head>
        <title>A.P. Skills snake</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>A.P. Skills snake</h1>
      <StyledContainer>
        <BackgroundLayer />
        <GameLayer />
        <UILayer />
      </StyledContainer>
    </>
  );
}
