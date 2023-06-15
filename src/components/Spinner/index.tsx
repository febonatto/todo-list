// Styles imports
import { StyledSpinner } from './styles';

interface IComponentProps {
  size?: number;
}
export default function Spinner({
  size = 32
}: IComponentProps) {
  return (
    <StyledSpinner $size={size} />
  );
}
