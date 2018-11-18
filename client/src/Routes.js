import React, { lazy } from 'react';
import { Router } from '@reach/router';

import Home from './Home';
const Chat = lazy(() => import('./Chat' /* webpackChunkName: "chat" */));

const Routes = props => {
  return (
    <Router>
      <Home path="/" />
      <Chat path="/chat" />
    </Router>
  );
};

export default Routes;
