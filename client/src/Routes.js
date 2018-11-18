import React from 'react';
import { Router } from '@reach/router';

import Home from './Home';
import Chat from './Chat';

const Routes = props => {
  return (
    <Router>
      <Home path="/" />
      <Chat path="/chat" />
    </Router>
  );
};

export default Routes;
