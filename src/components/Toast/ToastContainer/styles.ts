import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  bottom: 48px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 32px);
  max-width: 336px;
  z-index: 2;
`;
