import React from 'react';
import { interpret } from 'xstate/lib/interpreter';

import roundMachine from './round.machine';

class Manager extends React.Component {
  state = {
    current: roundMachine.initialState,
  };

  service = interpret(roundMachine).onTransition(current =>
    this.setState({ current }),
  );

  componentDidMount() {
    this.service.start();
  }

  componentWillUnmount() {
    this.service.stop();
  }

  next = () => {
    const { send } = this.service;
    send('TIME');
  };

  render() {
    const { current } = this.state;
    return <>{this.props.children({ gameState: current, next: this.next })}</>;
  }
}

export default Manager;
