import styled from "@emotion/styled";

interface StyledUILayerProps {
  uISize: number;
}

export const StyledUILayer = styled.div<StyledUILayerProps>`
  position: absolute;
  z-index: 3;
  width: ${(props) => props.uISize + "px"};
  height: ${(props) => props.uISize + "px"};
`;
