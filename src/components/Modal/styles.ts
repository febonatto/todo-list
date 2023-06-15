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

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 16px;
  background: rgba(0, 0, 0, 0.75);
`;

export const Container = styled.div<{ $danger: boolean }>`
  width: 100%;
  max-width: 448px;
  padding: 16px;
  border: 2px solid transparent;
  border-radius: 4px;
  background: ${({ theme }) => theme.background.overlay};

  ${({ theme, $danger }) => $danger && css`
    border: 2px solid ${theme.danger.main};
  `};
`;

export const Header = styled.div<{ $priority: EPriority }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.text.secondary};

  h2 {
    font-size: 1.00rem;
    font-weight: 500;
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
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  strong {
    font-size: 0.90rem;
  }

  .content-group {
    span {
      font-size: 0.90rem;
      font-weight: 500;
    }

    p {
      color: ${({ theme }) => theme.text.secondary};
      font-size: 0.75rem;
      font-weight: 300;
    }
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 12px;
  }
`;
