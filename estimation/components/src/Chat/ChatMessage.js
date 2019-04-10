import React from 'react';

import Text from '../components/Text';

const ChatMessage = props => {
  return <Text>{props.message}</Text>;
};

export default ChatMessage;
