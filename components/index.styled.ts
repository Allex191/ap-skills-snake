import styled from "@emotion/styled";
import { GAME_HEIGHT, GAME_WIDTH } from "data/constants";

export const StyledContainer = styled.div`
  padding: 0 10px;
  margin: 0 auto;
`;

export const StyledOuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 50px;
`;

export const StyledLayers = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${GAME_WIDTH}px;
  height: ${GAME_HEIGHT}px;
  max-width: 1200px;
`;

export const StyledBackgroundLayer = styled.canvas`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
`;

export const StyledGameLayer = styled.canvas`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
`;

export const StyledUILayer = styled.div`
  position: absolute;
  z-index: 3;
`;
