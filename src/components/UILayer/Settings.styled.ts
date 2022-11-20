import styled from "@emotion/styled";
import { getGameScaledValue } from "utils/getGameScaledValue";

export const settings = styled.div`
  display: flex;
`;
export const settingsIcon = styled.div``;
export const settingsIconImg = styled.img`
  width: ${({ theme }) => getGameScaledValue(theme, 70, "px")};
  height: ${({ theme }) => getGameScaledValue(theme, 70, "px")};
`;
export const settingsOptions = styled.div`
  border: 2px solid red;
`;
export const settingsOption = styled.div``;
