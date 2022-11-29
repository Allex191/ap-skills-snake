import styled from "@emotion/styled";

export const pageBg = styled.div`
  top: 5vh;
  bottom: 5vh;
  right: 5vw;
  left: 5vw;
  position: absolute;
  width: 90vw;
  height: 90vh;
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
