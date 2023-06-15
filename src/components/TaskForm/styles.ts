import { css, styled } from 'styled-components';

export const FormContainer = styled.div``;

export const Header = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;

  a {
    position: absolute;
    top: -4px;
    left: 0;
  }

  h2 {
    font-size: 1.15rem;
  }
`;

export const Form = styled.form`
  button {
    width: 100%;
  }
`;

export const FormGroup = styled.div<{ $error?: boolean }>`
  margin-bottom: 16px;

  label {
    font-size: 0.90rem;
    display: flex;
    flex-direction: column;
    gap: 4px;

    input, select, textarea {
      font-size: 0.75rem;
      height: 32px;
      padding: 6px;
      border: 2px solid transparent;
      border-radius: 4px;
      background: ${({ theme }) => theme.background.overlay};
      outline: transparent;

      &:focus {
        border-color: ${({ theme }) => theme.highlight.main};
      }

      &[disabled] {
        opacity: 0.50;
        cursor: not-allowed;
      }
    }

    ${({ theme, $error }) => $error && css`
      color: ${theme.danger.main};

      input, select, textarea {
        color: inherit;
        border-color: ${theme.danger.main} !important;
      }
    `};
  }

  small {
    color: ${({ theme }) => theme.danger.main};
    font-size: 0.75rem;
    font-weight: 300;
  }

  textarea {
    min-width: 100%;
    max-width: 100%;
    width: 100%;
    min-height: 72px !important;
    max-height: 144px;
    height: 72px;
  }
`;
