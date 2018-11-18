import React from 'react';

import ChatMessage from './ChatMessage';

const MessageList = props => {
  var messages = props.messages.map(function(msg, i) {
    return <ChatMessage message={msg} key={i} />;
  });

  return <div>{messages}</div>;
};

export default MessageList;
