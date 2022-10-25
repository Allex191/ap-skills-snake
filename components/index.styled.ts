import styled from "@emotion/styled";

export const StyledContainer = styled.div`
  padding: 0 10px;
  margin: 0 auto;
`;

export const StyledOuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
  padding-top: 50px;
`;

interface IStyledLayers {
  gameWidth: number;
  gameHeight: number;
}
export const StyledLayers = styled.div<IStyledLayers>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.gameWidth + "px"};
  height: ${(props) => props.gameHeight + "px"};
  max-width: 1200px;
`;

export const StyledBackgroundLayer = styled.canvas`
  position: absolute;
  z-index: 1;
  border: 10px solid brown;
`;

export const StyledGameLayer = styled.canvas`
  position: absolute;
  z-index: 2;
  border: none;
`;

export const StyledUILayer = styled.div`
  position: absolute;
  z-index: 3;
`;
