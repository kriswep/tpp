import React, { Component } from 'react';

import Text from '../components/Text';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import MessageStore from './MessageStore';
import ConnectionManager from '../connection/manager';
import ConnectionForm from './ConnectionForm';

class Chat extends Component {
  state = {
    messages: MessageStore.getMessages(),
    connected: ConnectionManager.isConnected(),
  };

  componentDidMount() {
    MessageStore.subscribe(this.updateMessages);
    ConnectionManager.onStatusChange(this.updateConnection);
    ConnectionManager.onMessage(MessageStore.newMessage);
  }

  componentWillUnmount() {
    MessageStore.unsubscribe(this.updateMessages);
    ConnectionManager.offStatusChange(this.updateConnection);
    ConnectionManager.offMessage(MessageStore.newMessage);
  }

  updateMessages = () => {
    this.setState({
      messages: MessageStore.getMessages(),
    });
  };

  updateConnection = () => {
    this.setState({
      connected: ConnectionManager.isConnected(),
    });
  };

  onSend = newMessage => {
    ConnectionManager.sendMessage(newMessage);
    MessageStore.newMessage(newMessage);
  };

  render() {
    return (
      <div>
        {this.state.connected ? (
          <>
            <MessageList messages={this.state.messages} />
            <MessageForm onSend={this.onSend} />
          </>
        ) : (
          <>
            <Text>Please connect!</Text>
            <ConnectionForm
              connected={this.state.connected}
              onHost={ConnectionManager.host}
              onJoin={ConnectionManager.join}
            />
          </>
        )}
      </div>
    );
  }
}

export default Chat;