// Styles imports
import { Overlay } from './styles';

// Assets imports
import logo from '../../assets/images/logo.png';

interface IComponentProps {
  visible: boolean;
}
export default function Loader({
  visible
}: IComponentProps) {
  if(!visible) {
    return null;
  }

  return (
    <Overlay>
      <img src={logo} alt="Logo" />
    </Overlay>
  );
}
