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
import { useResize } from "hooks/useResize";
import { useSelector } from "react-redux";
import { RootState } from "Redux/redux";

export default function Home() {
  const { windowWidth, windowHeight, scale } = useSelector(
    (state: RootState) => state.viewReducer
  );
  useResize();
  return (
    <>
      <Head>
        <title>A.P. Skills snake</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledContainer>
        <StyledOuterWrapper>
          <StyledLayers
            scale={scale}
            gameWidth={windowWidth}
            gameHeight={windowHeight}
          >
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
