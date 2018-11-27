import React, { Component } from 'react';

import MessageList from './MessageList';
import MessageForm from './MessageForm';
import Connection from '../Manager/Connection';

class Chat extends Component {
  render() {
    return (
      <div>
        <Connection>
          {({ connected, messages, send }) => {
            if (!connected) return null;
            return (
              <>
                {messages && <MessageList messages={messages} />}
                <MessageForm onSend={send} />
              </>
            );
          }}
        </Connection>
      </div>
    );
  }
}

export default Chat;
