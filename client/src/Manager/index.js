import React from 'react';
import { interpret } from 'xstate/lib/interpreter';

import Button from '../components/Button';
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

  render() {
    const { current } = this.state;
    const { send } = this.service;
    return <Button onClick={() => send('TIME')}>{current.value}</Button>;
  }
}

export default Manager;
