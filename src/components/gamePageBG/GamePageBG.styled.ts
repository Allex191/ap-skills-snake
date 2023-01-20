import styled from "@emotion/styled";
import { StyledAppDisplaySize } from "styles/shared.styled";

export const pageBg = styled.div`
  ${StyledAppDisplaySize}
  position: absolute;
`;

export const pageImg = styled.img`
  position: inherit;
  user-select: none;
  width: inherit;
  height: inherit;
  z-index: -1;
  object-fit: cover;
  filter: blur(5px) contrast(85%);
`;

export const touchZone = styled.div`
  width: inherit;
  height: inherit;
`;
