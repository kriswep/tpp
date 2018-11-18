import React, { Component } from 'react';

import Input from '../components/Input';
import Button from '../components/Button';

class MessageForm extends Component {
  state = {
    input: '',
  };

  submit = e => {
    e.preventDefault();

    this.props.onSend(this.state.input);

    this.setState({
      input: '',
    });
  };

  updateInput = e => {
    this.setState({ input: e.target.value });
  };

  render() {
    return (
      <form onSubmit={this.submit}>
        <Input
          value={this.state.input}
          onChange={this.updateInput}
          type="text"
        />
        <Button as="input" type="submit" value="Send" />
      </form>
    );
  }
}

export default MessageForm;
