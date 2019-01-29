import React from 'react';

import ScreenCenterer from '../components/ScreenCenterer';
import Explain from '../components/Explain';
import Result from '../components/Result';
import Cards from './Cards';

const Estimator = ({ gameState }) => {
  if (!gameState) return null;

  return (
    <>
      {gameState.matches('intro') && (
        <ScreenCenterer>
          <Explain noCenter={true} />
        </ScreenCenterer>
      )}
      {gameState.matches('play') && <Cards />}
      {gameState.matches('result') && (
        <ScreenCenterer>
          <Result noCenter={true} />
        </ScreenCenterer>
      )}
    </>
  );
};

export default Estimator;
