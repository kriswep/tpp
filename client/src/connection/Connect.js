import React from 'react';

import ConnectionManager from '../connection/manager';
import ConnectionForm from '../connection/ConnectionForm';

const Connect = props => {
  return (
    <>
      <ConnectionForm
        connected={props.connected}
        onHost={ConnectionManager.host}
        onJoin={ConnectionManager.join}
      />
    </>
  );
};

export default Connect;
