import React from 'react';

import Text from '../components/Text';
import Button from '../components/Button';

const ConnectionForm = props => {
  return (
    <div>
      {props.connected ? <Text>Connected</Text> : <Text>Not connected</Text>}
      <Button onClick={props.onHost}>Host</Button>
      <Button onClick={props.onJoin}>Join</Button>
    </div>
  );
};

export default ConnectionForm;
