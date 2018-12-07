import React from 'react';

import ConnectionManager from '../connection/manager';
import ConnectionForm from '../connection/ConnectionForm';
import Text from '../components/Text';

const Connect = props => {
  return (
    <>
      <Text>Please connect!</Text>
      <ConnectionForm
        connected={props.connected}
        onHost={ConnectionManager.host}
        onJoin={ConnectionManager.join}
      />
    </>
  );
};

export default Connect;
