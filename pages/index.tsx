import BackgroundLayer from "components/BackgroundLayer";
import GameLayer from "components/GameLayer";
import UILayer from "components/UILayer";
import Head from "next/head";
import {
  StyledContainer,
  StyledLayers,
  StyledOuterWrapper,
} from "components/index.styled";
import Navigation from "components/Navigation";

export default function Home() {
  return (
    <>
      <Head>
        <title>A.P. Skills snake</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledContainer>
        <StyledOuterWrapper>
          <StyledLayers>
            <BackgroundLayer />
            <GameLayer />
            <UILayer />
          </StyledLayers>
          <Navigation />
        </StyledOuterWrapper>
      </StyledContainer>
    </>
  );
}
