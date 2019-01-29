import React from 'react';

import Master from './Master';
import Estimator from './Estimator';
// import Card from './Card';
// import Text from '../components/Text';
import useConnection from '../Manager/Connection';
import useGameState from '../Manager/GameState';
import Connect from '../connection/Connect';
// import Button from '../components/Button';

export const Index = () => {
  const { connected, send, isHost } = useConnection();
  const { gameState, next } = useGameState(isHost ? send : null);

  if (!connected) return <Connect connected={connected} />;

  return (
    <>
      {isHost && <Master gameState={gameState} next={next} />}
      {!isHost && <Estimator gameState={gameState} />}
    </>
  );
};

export default Index;
