import React from 'react';
import posed, { PoseGroup } from 'react-pose';

import ScreenCenterer from '../components/ScreenCenterer';
import Button from '../components/Button';
import Explain from '../components/Explain';
import Wait from '../components/Wait';
import Result from '../components/Result';

const Poser = posed.div({
  enter: { x: 0, opacity: 1 },
  exit: { x: 50, opacity: 0 },
});
const Listen = ({ gameState, next }) => {
  if (!gameState) return null;

  return (
    <ScreenCenterer>
      <PoseGroup>
        {gameState.matches('intro') && (
          <Poser key={gameState.value}>
            <Explain noCenter={true} />
          </Poser>
        )}
        {gameState.matches('play') && (
          <Poser key={gameState.value}>
            <Wait noCenter={true} />
          </Poser>
        )}
        {gameState.matches('result') && (
          <Poser key={gameState.value}>
            <Result />
          </Poser>
        )}
      </PoseGroup>
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
