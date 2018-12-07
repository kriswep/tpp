import React, { Component, useEffect, useState } from 'react';

import MessageStore from '../connection/MessageStore';
import ConnectionManager from '../connection/manager';
import ConnectionForm from '../connection/ConnectionForm';
import Text from '../components/Text';

class Connection extends Component {
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
    const { connected, messages } = this.state;
    const isHost = ConnectionManager.isHost();
    return !connected ? (
      <>
        <Text>Please connect!</Text>
        <ConnectionForm
          connected={connected}
          onHost={ConnectionManager.host}
          onJoin={ConnectionManager.join}
        />
      </>
    ) : (
      this.props.children({ connected, messages, send: this.onSend, isHost })
    );
  }
}

export const useConnection = () => {
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

export default Connection;
