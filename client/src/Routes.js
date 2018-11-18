import React, { lazy } from 'react';
import { Router } from '@reach/router';

import Home from './Home';
const Card = lazy(() => import('./Card' /* webpackChunkName: "card" */));
const Chat = lazy(() => import('./Chat' /* webpackChunkName: "chat" */));

const Routes = props => {
  return (
    <Router>
      <Home path="/" />
      <Card path="/card" />
      <Chat path="/chat" />
    </Router>
  );
};

export default Routes;
