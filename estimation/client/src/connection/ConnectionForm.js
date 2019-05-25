import React, { useState } from 'react';
import styled from 'styled-components/macro';

import ScreenCenterer from '../components/ScreenCenterer';
import Text from '../components/Text';
import Input from '../components/Input';
import Button from '../components/Button';

const Fieldset = styled.fieldset`
  border: none;
  margin: 0;
  padding: 0;
`;

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
    <ScreenCenterer>
      <form method="post">
        {props.connected ? (
          <Text>Connected</Text>
        ) : (
          <>
            <Text size="big">Team Estimation</Text>
            <Text>Enter an estimation channel.</Text>
          </>
        )}
        <Fieldset>
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
        </Fieldset>
        <Fieldset>
          <Button onClick={props.onHost.bind(null, channel, name)}>
            Create
          </Button>
          <Button onClick={props.onJoin.bind(null, channel, name)}>Join</Button>
        </Fieldset>
      </form>
    </ScreenCenterer>
  );
};

export default ConnectionForm;
