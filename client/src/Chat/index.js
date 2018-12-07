import React from 'react';

import MessageList from './MessageList';
import MessageForm from './MessageForm';
import { useConnection } from '../Manager/Connection';
import Connect from '../connection/Connect';

const Chat = () => {
  const { connected, messages, send } = useConnection();
  // return (
  // <div>

  /* <Connection>
          {({ connected, messages, send }) => { */

  if (!connected) return <Connect connected={connected} />;
  return (
    <>
      {messages && <MessageList messages={messages} />}
      <MessageForm onSend={send} />
    </>
  );
  //   }}
  // </Connection>
  // </div>
  // );
};

export default Chat;
