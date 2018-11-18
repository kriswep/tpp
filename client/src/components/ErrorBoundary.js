import React, { Component } from 'react';

export default class extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    return this.state.hasError
      ? console.log(this.state.error) || <p>An error occured</p>
      : this.props.children;
  }
}
