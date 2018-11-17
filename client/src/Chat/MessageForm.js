import React, { Component } from 'react';

class MessageForm extends Component {
  state = {
    input: '',
  };

  submit = ev => {
    ev.preventDefault();

    this.props.onSend(this.state.input);

    this.setState({
      input: '',
    });
  };

  updateInput = ev => {
    this.setState({ input: ev.target.value });
  };

  render() {
    return (
      <form onSubmit={this.submit}>
        <input
          value={this.state.input}
          onChange={this.updateInput}
          type="text"
        />
        <input type="submit" value="Send" />
      </form>
    );
  }
}

export default MessageForm;
