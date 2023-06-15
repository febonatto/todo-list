// React imports
import { useCallback, useEffect, useState } from 'react';

// Styles imports
import { Container } from './styles';

// Components imports
import ToastMessage from '../ToastMessage';

// Libs imports
import { IMessage } from '../../../lib/EventManager';

// Utils imports
import { toastEventManager } from '../../../utils/toast';

export default function ToastContainer() {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    function handleAddToast({ type, text, duration }: IMessage) {
      setMessages((prevState) => [
        ...prevState,
        {
          id: Math.random(),
          type,
          text,
          duration,
        },
      ]);
    }

    toastEventManager.on('addtoast', handleAddToast);

    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast);
    };
  }, []);

  const handleRemoveMessage = useCallback((id: number) => {
    setMessages((prevState) => prevState.filter(
      (message) => message.id !== id,
    ));
  }, []);

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveMessage}
        />
      ))}
    </Container>
  );
}
