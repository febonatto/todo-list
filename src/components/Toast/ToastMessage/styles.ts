import { styled, css } from 'styled-components';
import { EType } from '../../../lib/EventManager';

const containerVariants = {
  [EType.success]: css`
    background: ${({ theme }) => theme.status.success};
  `,
  [EType.error]: css`
    background: ${({ theme }) => theme.status.error};
  `,
  [EType.regular]: css`
    background: ${({ theme }) => theme.status.regular};
  `,
};

export const Container = styled.div<{ $type: EType }>`
  padding: 16px 0;
  border-radius: 4px;
  box-shadow: 0px 20px 20px -16px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;

  ${({ $type }) => containerVariants[$type] || containerVariants[EType.regular]};

  strong {
    font-size: 0.90rem;
  }

  & + & {
   margin-top: 12px;
  }
`;
