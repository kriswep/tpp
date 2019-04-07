import { useEffect, useState } from 'react';

import MessageStore from '../connection/MessageStore';
import ConnectionManager from '../connection/manager';

const useConnection = () => {
  const [messages, setMessages] = useState(MessageStore.getMessages());
  const [connected, setConnected] = useState(ConnectionManager.isConnected());
  const [lastError, setLastError] = useState({ error: false });
  useEffect(() => {
    MessageStore.subscribe(updateMessages);
    ConnectionManager.onStatusChange(updateConnection);
    ConnectionManager.onMessage(MessageStore.newMessage);
    ConnectionManager.onError(onError);
    return () => {
      MessageStore.unsubscribe(updateMessages);
      ConnectionManager.offStatusChange(updateConnection);
      ConnectionManager.offMessage(MessageStore.newMessage);
      ConnectionManager.offError(onError);
    };
  }, []);
  const updateMessages = () => {
    setMessages(MessageStore.getMessages());
  };
  const updateConnection = () => {
    const connected = ConnectionManager.isConnected();
    setConnected(connected);
    if (connected) {
      // remove last error
      setLastError({ error: false });
    }
  };
  const onSend = newMessage => {
    ConnectionManager.sendMessage(newMessage);
    MessageStore.newMessage(newMessage);
  };

  const onError = newError => {
    setLastError(newError);
    updateConnection();
  };
  return {
    id: ConnectionManager.getId(),
    connected,
    messages,
    send: onSend,
    isHost: ConnectionManager.isHost(),
    lastError,
  };
};

export default useConnection;
