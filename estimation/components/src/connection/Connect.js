import React from 'react';

import ConnectionManager from '../connection/manager';
import ConnectionForm from '../connection/ConnectionForm';
import Text from '../components/Text';

const Connect = props => {
  const error = props.lastError && props.lastError.error;
  const errorReason = error && `: ${props.lastError.message}`;
  return (
    <React.Fragment>
      <ConnectionForm
        connected={props.connected}
        onHost={ConnectionManager.host}
        onJoin={ConnectionManager.join}
      />
      {error && (
        <Text>
          Sorry, that did not work
          {errorReason}
        </Text>
      )}
    </React.Fragment>
  );
};

export default Connect;
