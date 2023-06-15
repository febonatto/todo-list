// React imports
import { useEffect } from 'react';

// Phosphor icons imports
import { CheckCircle, XCircle } from '@phosphor-icons/react';

// Styles imports
import { Container } from './styles';

// Lib imports
import { IMessage, EType } from '../../../lib/EventManager';

interface IComponentProps {
  message: IMessage;
  onRemoveMessage: (id: number) => void;
}
export default function ToastMessage({
  message,
  onRemoveMessage,
}: IComponentProps) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if(message.id) {
        onRemoveMessage(message.id);
      }
    }, message.duration || 7000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [message, onRemoveMessage]);

  function handleRemoveToast() {
    if(message.id) {
      onRemoveMessage(message.id);
    }
  }

  return (
    <Container
      $type={message.type}
      onClick={handleRemoveToast}
      tabIndex={0}
      role="button"
    >
      {message.type === EType.success && <CheckCircle size={24} color="#F4F4F4" />}
      {message.type === EType.error && <XCircle size={24} color="#F4F4F4" />}
      <strong>{message.text}</strong>
    </Container>
  );
}
