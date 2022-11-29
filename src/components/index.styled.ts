import styled from "@emotion/styled";

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
  border: 15px solid brown;
`;

export const StyledGameLayer = styled.canvas`
  position: absolute;
  z-index: 2;
  border: none;
`;
