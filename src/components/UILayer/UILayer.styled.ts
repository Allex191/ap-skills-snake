import styled from "@emotion/styled";
import { CanvasLayersSize } from "Redux/slices/viewSlice";
import { css } from "@emotion/react";
import { StyledAppDisplaySize } from "styles/shared.styled";
import { getGameScaledValue } from "utils/getGameScaledValue";

interface StyledUILayerProps {
  uISize: number;
  canvasLayersSize: CanvasLayersSize;
}

export const uILayer = styled.div<StyledUILayerProps>`
  ${StyledAppDisplaySize}
  position: absolute;
  z-index: 3;
  font-size: ${({ theme }) => getGameScaledValue(theme, 50, "px")};
  color: ${({ theme }) => theme.colors.secondary};
`;

interface StyledMenuProps {
  uISize: number;
  isShow: boolean;
}

export const menu = styled.div<StyledMenuProps>`
  position: absolute;
  display: ${(props) => (props.isShow ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.uISize + "px"};
  height: ${(props) => props.uISize + "px"};
  background-color: ${({ theme }) => theme.colors.uIBackground};
  overflow-y: scroll;
  overflow-x: auto;
  top: calc(50% - ${(props) => `${props.uISize / 2}px`});
  left: calc(50% - ${(props) => `${props.uISize / 2}px`});
`;

export const menuInner = styled.div`
  width: 85%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const gameHintScore = css`
  position: absolute;
  z-index: 3;
  font-weight: 700;
  color: #ffffff;
  user-select: none;
`;

export const navigationHint = styled.p`
  ${gameHintScore};
  top: ${({ theme }) => getGameScaledValue(theme, 200, "px")};
  left: ${({ theme }) => getGameScaledValue(theme, 200, "px")};
  font-size: ${({ theme }) => getGameScaledValue(theme, 65, "px")};
`;

export const currentScoreArea = styled.p`
  ${gameHintScore};
  top: 0;
  right: ${({ theme }) => getGameScaledValue(theme, 20, "px")};
  font-size: ${({ theme }) => getGameScaledValue(theme, 55, "px")};
`;

export const gameTitle = styled.h1`
  font-size: ${({ theme }) => getGameScaledValue(theme, 85, "px")};
`;

export const gameOver = styled.div``;

export const gameOverTitle = styled.p`
  font-size: ${({ theme }) => getGameScaledValue(theme, 50, "px")};
  text-align: center;
`;

export const gameOverHint = styled.p`
  font-size: ${({ theme }) => getGameScaledValue(theme, 33, "px")};
  text-align: center;
`;

export const stats = styled.div`
  display: flex;
  justify-content: center;
`;
export const statsIcon = styled.div`
  margin: auto;
  user-select: none;
`;

export const statsIconImg = styled.img`
  width: ${({ theme }) => getGameScaledValue(theme, 70, "px")};
  height: ${({ theme }) => getGameScaledValue(theme, 70, "px")};
  user-select: none;
`;
export const score = styled.div`
  padding: ${({ theme }) => getGameScaledValue(theme, 25, "px")};
  border-color: ${({ theme }) => theme.colors.optionsBorder};
  border-style: solid;
  border-width: ${({ theme }) => getGameScaledValue(theme, 8, "px")};
  border-radius: ${({ theme }) => getGameScaledValue(theme, 10, "px")};
`;
export const scorePrev = styled.p``;
export const scoreHigh = styled.p``;

export const startButton = styled.button`
  font-size: ${({ theme }) => getGameScaledValue(theme, 55, "px")};
  color: inherit;
  cursor: pointer;
  background: linear-gradient(229.34deg, #d7644a 8.35%, #de527a 89.61%);
  padding: ${({ theme }) =>
    `${getGameScaledValue(theme, 20, "px")}
     ${getGameScaledValue(theme, 40, "px")}`};
  border-radius: ${({ theme }) => getGameScaledValue(theme, 10, "px")};
  user-select: none;
`;
