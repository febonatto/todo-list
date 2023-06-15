import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    color: ${({ theme }) => theme.text.primary};
    font-family: 'Sora', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.background.main};
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyles;
