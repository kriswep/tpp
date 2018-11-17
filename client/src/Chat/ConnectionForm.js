import React from 'react';

const ConnectionForm = props => {
  return (
    <div>
      {props.connected ? 'Connected' : 'Not connected'}
      <button onClick={props.onHost}>Host</button>
      <button onClick={props.onJoin}>Join</button>
    </div>
  );
};

export default ConnectionForm;
