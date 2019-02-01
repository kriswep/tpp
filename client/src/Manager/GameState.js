import { useEffect, useMemo, useState } from 'react';
import { interpret } from 'xstate/lib/interpreter';

import roundMachine from './round.machine';

function useMachine(machine) {
  return distribute => {
    const [current, setCurrent] = useState(machine.initialState);
    const service = useMemo(
      () =>
        interpret(machine)
          .onTransition(state => {
            if (distribute) {
              distribute(JSON.stringify({ type: 'gamestate', state }));
            }
            setCurrent(state);
          })
          // .onEvent(e => console.log('EVENT:', e))
          .start(),
      [typeof distribute],
    );

    useEffect(() => {
      return () => service.stop();
    }, []);

    const next = () => {
      const { send } = service;
      send('TIME');
    };

    return { gameState: current, next };
  };
}

const useGameState = useMachine(roundMachine());

export default useGameState;
