import { styled, keyframes } from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate3d(0, 0, 0, 0deg);
  }

  to {
    transform: rotate3d(0, 1, 0, 360deg);
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);

  img {
    animation: ${spin} 1000ms linear infinite;
    pointer-events: none;
  }
`;
