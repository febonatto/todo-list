import { styled, css } from 'styled-components';

import { EPriority } from '../../models/TaskModel';

const priorityVariants = {
  [EPriority.low]: css`
    background: ${({ theme }) => theme.priority.low};
  `,
  [EPriority.medium]: css`
    background: ${({ theme }) => theme.priority.medium};
  `,
  [EPriority.high]: css`
    background: ${({ theme }) => theme.priority.high};
  `,
};

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;

  button {
    width: 100%;
  }
`;

export const SearchNotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;

  span {
    color: ${({ theme }) => theme.highlight.main};
  }
`;

export const EmptyListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;

  span {
    color: ${({ theme }) => theme.highlight.main};
  }
`;

interface IHeaderProps {
  $justifyContent: string;
}
export const Header = styled.div<IHeaderProps>`
  display: flex;
  justify-content: ${({ $justifyContent }) => $justifyContent};
  align-items: center;
  margin-bottom: 24px;

  strong {
    color: ${({ theme }) => theme.text.primary};
    font-size: 1.15rem;
  }

  a {
    text-decoration: none;
  }
`;

export const InputSearch = styled.div`
  margin-bottom: 24px;

  input {
    color: ${({ theme }) => theme.text.primary};
    font-size: 0.75rem;
    width: 100%;
    height: 48px;
    padding-left: 16px;
    border: 2px solid transparent;
    border-radius: 24px;
    background: ${({ theme }) => theme.background.overlay};
    box-shadow: 4px 5px 8px rgba(0, 0, 0, 0.30);
    outline: transparent;

    &:focus {
      border: 2px solid ${({ theme }) => theme.highlight.main};
    }

    &::placeholder {
      color: ${({ theme }) => theme.text.secondary};
    }
  }
`;

interface ICardProps {
  $priority: EPriority;
}
export const Card = styled.div<ICardProps>`
  padding: 16px;
  border-radius: 4px;
  background: ${({ theme }) => theme.background.overlay};
  box-shadow: 4px 5px 8px rgba(0, 0, 0, 0.30);

  .header, .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
  }

  .header {
    margin-bottom: 16px;

    strong {
      font-size: 1.00rem;
      font-weight: 500;
      text-decoration: underline;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      cursor: pointer;
    }

    span {
      color: ${({ theme }) => theme.text.contrast};
      font-size: 0.75rem;
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 92px;
      padding: 6px 0;
      border-radius: 4px;
      box-shadow: 4px 5px 8px rgba(0, 0, 0, 0.15);

      ${({ $priority }) => priorityVariants[$priority]};
    }
  }

  .content {
    p {
      color: ${({ theme }) => theme.text.secondary};
      font-size: 0.90rem;
      font-weight: 300;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }

    .actions {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 24px;
      min-width: 92px;

      button {
        border: transparent;
        background: transparent;
        outline: transparent;
      }
    }
  }

  & + & {
    margin-top: 24px;
  }
`;
