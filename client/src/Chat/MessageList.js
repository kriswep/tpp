import React from 'react';

import Text from '../components/Text';
import ChatMessage from './ChatMessage';

const MessageList = props => {
  var messages = props.messages.map(function(msg, i) {
    return <ChatMessage message={msg} key={i} />;
  });

  return (
    <div>
      <Text>{messages}</Text>
    </div>
  );
};

export default MessageList;
