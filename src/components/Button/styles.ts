import { css, styled } from 'styled-components';

export const StyledButton = styled.button<{ $secondary: boolean, $danger: boolean }>`
  font-size: 0.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  padding: 0 16px;
  border: 2px solid transparent;
  border-radius: 4px;
  background: ${({ theme }) => theme.highlight.main};
  box-shadow: 4px 5px 8px rgba(0, 0, 0, 0.15);
  outline: transparent;
  transition: all 500ms ease;

  &:hover {
    border-color: ${({ theme }) => theme.highlight.light};
    background: ${({ theme }) => theme.highlight.light};
  }

  &:active {
    border-color: ${({ theme }) => theme.highlight.dark};
    background: ${({ theme }) => theme.highlight.dark};
  }

  &[disabled] {
    opacity: 0.50;
    cursor: not-allowed;
  }

  ${({ theme, $secondary }) => $secondary && css`
    color: ${theme.highlight.main};
    border-color: ${theme.highlight.main};
    background: transparent !important;

    &:hover {
      color: ${theme.highlight.light};
    }

    &:active {
      color: ${theme.highlight.dark};
    }
  `};

  ${({ theme, $danger }) => $danger && css`
    background: ${theme.danger.main};

    &:hover {
      border-color: ${theme.danger.light};
      background: ${theme.danger.light};
    }

    &:active {
      border-color: ${theme.danger.dark};
      background: ${theme.danger.dark};
    }
  `};

  ${({ theme, $secondary, $danger }) => ($secondary && $danger) && css`
    color: ${theme.danger.main};
    border-color: ${theme.danger.main};

    &:hover {
      color: ${theme.danger.light};
    }

    &:active {
      color: ${theme.danger.dark};
    }
  `};
`;
