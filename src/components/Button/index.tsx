// React imports
import { ReactNode, ButtonHTMLAttributes } from 'react';

// Styles imports
import { StyledButton } from './styles';

// Components imports
import Spinner from '../Spinner';

interface IComponentProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  secondary?: boolean;
  danger?: boolean;
  children: ReactNode;
}
export default function Button({
  isLoading,
  secondary = false,
  danger = false,
  children,
  ...props
}: IComponentProps) {
  return (
    <StyledButton
      $secondary={secondary}
      $danger={danger}
      {...props}
    >
      {!isLoading && children}
      {isLoading && <Spinner size={12} />}
    </StyledButton>
  );
}
