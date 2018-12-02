import React from 'react';
import MessageStore from '../connection/MessageStore';
import { interpret } from 'xstate/lib/interpreter';

import roundMachine from './round.machine';

class GameState extends React.Component {
  state = {
    current: roundMachine().initialState,
  };

  service = interpret(roundMachine()).onTransition(current =>
    this.onTransition(current),
  );

  componentDidMount() {
    const allMessages = MessageStore.getMessages();
    let lastState = allMessages
      .filter(msg => {
        try {
          const message = JSON.parse(msg);
          return message.type === 'gamestate';
        } catch (e) {
          return false;
        }
      })
      .pop();

    if (lastState) {
      lastState = JSON.parse(lastState);
      this.service = interpret(
        roundMachine(lastState.current.value),
      ).onTransition(current => this.onTransition(current));
      this.setState({ current: lastState.current.value });
    }
    this.service.start();
  }

  componentWillUnmount() {
    // MessageStore.unsubscribe(this.updateMessages);
    this.service.stop();
  }

  onTransition = current => {
    if (this.props.distribute) {
      this.props.distribute(JSON.stringify({ type: 'gamestate', current }));
    }
    return this.setState({ current });
  };

  next = () => {
    const { send } = this.service;
    send('TIME');
  };

  render() {
    const { current } = this.state;
    return this.props.children({ gameState: current, next: this.next });
  }
}

export default GameState;
