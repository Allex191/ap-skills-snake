import styled from "@emotion/styled";
import { getGameScaledValue } from "utils/getGameScaledValue";

interface StyledUILayerProps {
  uISize: number;
}

export const uILayer = styled.div<StyledUILayerProps>`
  position: absolute;
  z-index: 3;
  top: calc(50% - ${(props) => `${props.uISize / 2}px`});
  left: calc(50% - ${(props) => `${props.uISize / 2}px`});
  background-color: white;
  font-size: ${({ theme }) => getGameScaledValue(theme, 50, "px")};
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
  background-color: ${({ theme }) => theme.colors.uIBackgroundColor};
`;

export const menuInner = styled.div`
  width: 80%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const navigationHint = styled.p`
  position: absolute;
  z-index: 3;
  color: white;
  user-select: none;
`;

export const gameTitle = styled.h1`
  font-size: ${({ theme }) => getGameScaledValue(theme, 100, "px")};
`;

export const stats = styled.div`
  display: flex;
  justify-content: center;
`;
export const statsIcon = styled.div`
  margin: auto;
`;

export const statsIconImg = styled.img`
  width: ${({ theme }) => getGameScaledValue(theme, 70, "px")};
  height: ${({ theme }) => getGameScaledValue(theme, 70, "px")};
`;
export const score = styled.div`
  border: ${({ theme }) => getGameScaledValue(theme, 4, "px")} solid red;
`;
export const scoreCurrent = styled.p``;
export const scoreHigh = styled.p``;

export const startButton = styled.button`
  font-size: inherit;
`;
