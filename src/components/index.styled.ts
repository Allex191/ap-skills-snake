import styled from "@emotion/styled";

export const StyledContainer = styled.div`
  padding: 0 10px;
  margin: 0 auto;
  max-width: 1200px;
`;

export const StyledOuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* padding-top: 50px; */
  height: 100vh;
`;

interface IStyledLayers {
  gameWidth: number;
  gameHeight: number;
  gameScale: number;
}
export const CanvasLayers = styled.div<IStyledLayers>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ gameWidth }) => gameWidth + "px"};
  height: ${({ gameHeight }) => gameHeight + "px"};
  transform: scale(${({ gameScale }) => gameScale});
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
