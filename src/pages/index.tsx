import BackgroundLayer from "components/BackgroundLayer";
import GameLayer from "components/GameLayer";
import GamePageBG from "components/gamePageBG/GamePageBG";
import { CanvasLayers } from "components/index.styled";
import UILayer from "components/uILayer/UILayer";
import { useResize } from "hooks/useResize";
import Head from "next/head";
import { useSelector } from "react-redux";
import { RootState } from "Redux/redux";

export default function Home() {
  const { windowWidth, windowHeight, gameScale } = useSelector(
    (state: RootState) => state.viewReducer
  );
  useResize();
  return (
    <>
      <Head>
        <title>A.P. Skills snake</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CanvasLayers
        gameScale={gameScale}
        gameWidth={windowWidth}
        gameHeight={windowHeight}
      >
        <BackgroundLayer />
        <GameLayer />
      </CanvasLayers>
      <UILayer />
      <GamePageBG />
    </>
  );
}
