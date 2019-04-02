import React from 'react';

import Master from './Master';
import Estimator from './Estimator';
import useConnection from '../Manager/Connection';
import useGameState from '../Manager/GameState';
import Connect from '../connection/Connect';

export const Index = () => {
  const { id, connected, send, messages, isHost, lastError } = useConnection();
  const { gameState, next } = useGameState(isHost ? send : null);

  if (!connected)
    return <Connect connected={connected} lastError={lastError} />;

  if (!isHost) {
    // we need to compute current state from received messages
    let neededGameState;
    for (let index = messages.length - 1; index >= 0; index--) {
      try {
        const message = JSON.parse(messages[index]);
        if (message.type === 'gamestate' && message.state) {
          neededGameState = message.state;
          break;
        }
      } catch {}
    }
    if (
      gameState &&
      neededGameState &&
      !gameState.matches(neededGameState.value)
    ) {
      next();
    }
  }

  return (
    <>
      {isHost && <Master gameState={gameState} next={next} id={id} />}
      {!isHost && <Estimator gameState={gameState} send={send} id={id} />}
    </>
  );
};

export default Index;
