import React, { Component, Suspense } from 'react';
import { Link } from '@reach/router';

import ErrorBoundary from './components/ErrorBoundary';
import Routes from './Routes';

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <nav>
            <Link to="/">Home</Link> <Link to="chat">Chat</Link>
          </nav>
          <Routes />
        </Suspense>
      </ErrorBoundary>
    );
  }
}

export default App;
