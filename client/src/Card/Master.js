import React from 'react';

import ScreenCenterer from '../components/ScreenCenterer';
import Button from '../components/Button';
import Explain from '../components/Explain';
import Wait from '../components/Wait';
import Result from '../components/Result';

const Listen = ({ gameState, next }) => {
  if (!gameState) return null;

  return (
    <ScreenCenterer>
      {gameState.matches('intro') && <Explain noCenter={true} />}
      {gameState.matches('play') && <Wait noCenter={true} />}
      {gameState.matches('result') && <Result noCenter={true} />}
      {next && (
        <Button align="flex-end" size="big" onClick={next}>
          {gameState.matches('intro') && 'start'}
          {gameState.matches('play') && 'finish'}
          {gameState.matches('result') && 'restart'}
        </Button>
      )}
    </ScreenCenterer>
  );
};

export default Listen;
