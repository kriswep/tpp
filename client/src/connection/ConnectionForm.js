import React, { useState } from 'react';

import Text from '../components/Text';
import Input from '../components/Input';
import Button from '../components/Button';

const ConnectionForm = props => {
  const [channel, setChannel] = useState('');
  const [name, setName] = useState('');

  const handleChange = e => {
    if (e.target.name === 'channel') {
      setChannel(e.target.value);
    } else if (e.target.name === 'name') {
      setName(e.target.value);
    }
  };
  return (
    <div>
      {props.connected ? <Text>Connected</Text> : <Text>Not connected</Text>}

      <Input
        name="channel"
        value={channel}
        onChange={handleChange}
        placeholder="channel"
        type="text"
      />
      <Input
        name="name"
        value={name}
        onChange={handleChange}
        placeholder="name"
        type="text"
      />
      <Button onClick={props.onHost.bind(null, channel, name)}>Host</Button>
      <Button onClick={props.onJoin.bind(null, channel, name)}>Join</Button>
    </div>
  );
};

export default ConnectionForm;
