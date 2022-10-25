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
  const { gameWidth, gameHeight } = useSelector(
    (state: RootState) => state.snakeReducer.gameSizes
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
          <StyledLayers gameWidth={gameWidth} gameHeight={gameHeight}>
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
