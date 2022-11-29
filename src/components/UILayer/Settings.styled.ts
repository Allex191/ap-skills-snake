import styled from "@emotion/styled";
import { getGameScaledValue } from "utils/getGameScaledValue";

export const settings = styled.div`
  display: flex;
`;
export const settingsIcon = styled.div`
  margin: auto;
`;

export const settingsIconImg = styled.img`
  width: ${({ theme }) => getGameScaledValue(theme, 80, "px")};
  height: ${({ theme }) => getGameScaledValue(theme, 80, "px")};
`;

export const settingsOptions = styled.div`
  margin: auto;
`;

export const settingsOption = styled.div`
  padding-top: ${({ theme }) => getGameScaledValue(theme, 9, "px")};
  padding-bottom: ${({ theme }) => getGameScaledValue(theme, 9, "px")};
  display: flex;
  align-items: center;
`;

export const settingsOptionButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: ${({ theme }) => getGameScaledValue(theme, 12, "px")};
  cursor: pointer;
`;

export const settingsOptionImg = styled.img`
  margin: auto;
  width: ${({ theme }) => getGameScaledValue(theme, 70, "px")};
  height: ${({ theme }) => getGameScaledValue(theme, 70, "px")};
`;
