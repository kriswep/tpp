import { useEffect, useState } from 'react';

import MessageStore from '../connection/MessageStore';
import ConnectionManager from '../connection/manager';

const useConnection = () => {
  const [messages, setMessages] = useState(MessageStore.getMessages());
  const [connected, setConnected] = useState(ConnectionManager.isConnected());
  useEffect(() => {
    MessageStore.subscribe(updateMessages);
    ConnectionManager.onStatusChange(updateConnection);
    ConnectionManager.onMessage(MessageStore.newMessage);
    return () => {
      MessageStore.unsubscribe(updateMessages);
      ConnectionManager.offStatusChange(updateConnection);
      ConnectionManager.offMessage(MessageStore.newMessage);
    };
  }, []);
  const updateMessages = () => {
    setMessages(MessageStore.getMessages());
  };
  const updateConnection = () => {
    setConnected(ConnectionManager.isConnected());
  };
  const onSend = newMessage => {
    ConnectionManager.sendMessage(newMessage);
    MessageStore.newMessage(newMessage);
  };
  return {
    connected,
    messages,
    send: onSend,
    isHost: ConnectionManager.isHost(),
  };
};

export default useConnection;
