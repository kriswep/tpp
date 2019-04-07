import React, { useState } from 'react';

import Input from '../components/Input';
import Button from '../components/Button';

const MessageForm = props => {
  const [input, setInput] = useState('');

  const submit = e => {
    e.preventDefault();

    props.onSend(input);
    setInput('');
  };

  const updateInput = e => {
    setInput(e.target.value);
  };

  return (
    <form onSubmit={submit}>
      <Input value={input} onChange={updateInput} type="text" />
      <Button as="input" type="submit" value="Send" />
    </form>
  );
};

export default MessageForm;
