import React from 'react';

import ScreenCenterer from '../components/ScreenCenterer';
import Listen from '../components/Listen';
import Result from '../components/Result';
import Cards from './Cards';

const Estimator = ({ id, gameState, send }) => {
  if (!gameState) return null;

  return (
    <>
      {gameState.matches('intro') && (
        <ScreenCenterer>
          <Listen noCenter={true} />
        </ScreenCenterer>
      )}
      {gameState.matches('play') && <Cards send={send} id={id} />}
      {gameState.matches('result') && (
        <ScreenCenterer>
          <Result />
        </ScreenCenterer>
      )}
    </>
  );
};

export default Estimator;
