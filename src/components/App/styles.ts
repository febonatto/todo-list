import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 24px 16px;
`;

export const Header = styled.header`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;

  img {
    width: 208px;
  }

  h1 {
    font-size: 1.25rem;
    letter-spacing: 4px;
    position: absolute;
    bottom: 16px;
  }
`;
