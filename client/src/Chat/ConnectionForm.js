import React, { Component } from 'react';

import Text from '../components/Text';
import Input from '../components/Input';
import Button from '../components/Button';

class ConnectionForm extends Component {
  state = {
    channel: '',
    name: '',
  };
  handleChange = e => {
    console.log(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div>
        {this.props.connected ? (
          <Text>Connected</Text>
        ) : (
          <Text>Not connected</Text>
        )}

        <Input
          name="channel"
          value={this.state.channel}
          onChange={this.handleChange}
          placeholder="channel"
          type="text"
        />
        <Input
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
          placeholder="name"
          type="text"
        />
        <Button
          onClick={this.props.onHost.bind(
            null,
            this.state.channel,
            this.state.name,
          )}
        >
          Host
        </Button>
        <Button
          onClick={this.props.onJoin.bind(
            null,
            this.state.channel,
            this.state.name,
          )}
        >
          Join
        </Button>
      </div>
    );
  }
}

export default ConnectionForm;
