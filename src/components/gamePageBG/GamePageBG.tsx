import { useRef } from "react";
import { useDispatch } from "react-redux";

import * as Styled from "components/gamePageBG/GamePageBG.styled";
import { useTouchHandler } from "hooks/useTouchHandler";

export type touchZoneRefT = null | HTMLDivElement;

const GamePageBG = () => {
  const touchZoneRef = useRef<touchZoneRefT>(null);
  const dispatch = useDispatch();

  useTouchHandler(touchZoneRef, dispatch);

  return (
    <Styled.pageBg>
      <Styled.pageImg src="grass.jpg" />
      <Styled.touchZone ref={touchZoneRef} />
    </Styled.pageBg>
  );
};

export default GamePageBG;
