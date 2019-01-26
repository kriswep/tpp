import React from 'react';

import ScreenCenterer from '../components/ScreenCenterer';
import Button from '../components/Button';
import Explain from '../components/Explain';
import Wait from '../components/Wait';

const Listen = ({ gameState, next }) => {
  if (!gameState) return null;

  return (
    <ScreenCenterer>
      {gameState.matches('intro') && <Explain noCenter={true} />}
      {gameState.matches('play') && <Wait noCenter={true} />}
      {next && (
        <Button align="flex-end" size="big" onClick={next}>
          Next
        </Button>
      )}
    </ScreenCenterer>
  );
};

export default Listen;
