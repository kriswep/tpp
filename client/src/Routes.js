import React, { lazy } from 'react';
import { Router } from '@reach/router';

import Card from './Card';

const Chat = lazy(() => import('./Chat' /* webpackChunkName: "chat" */));

const Routes = props => {
  return (
    <Router>
      <Card path="/" />
      <Chat path="/chat" />
    </Router>
  );
};

export default Routes;
