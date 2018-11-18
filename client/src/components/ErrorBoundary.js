import React, { Component } from 'react';

import Text from './Text';

export default class extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    return this.state.hasError
      ? console.log(this.state.error) || <Text>An error occured</Text>
      : this.props.children;
  }
}
