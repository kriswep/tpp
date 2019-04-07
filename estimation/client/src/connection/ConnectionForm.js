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
    <form method="post">
      {props.connected ? (
        <Text>Connected</Text>
      ) : (
        <Text>Please connect first.</Text>
      )}

      <Input
        name="channel"
        value={channel}
        onChange={handleChange}
        placeholder="channel"
        type="text"
        aria-label="Enter the channel name you wish to connect to."
      />
      <Input
        name="name"
        value={name}
        onChange={handleChange}
        placeholder="name"
        type="text"
        aria-label="Your name, so your teammates recognize you."
      />
      <Button onClick={props.onHost.bind(null, channel, name)}>Host</Button>
      <Button onClick={props.onJoin.bind(null, channel, name)}>Join</Button>
    </form>
  );
};

export default ConnectionForm;
