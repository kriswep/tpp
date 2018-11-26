import { Machine } from 'xstate';

const roundMachine = Machine({
  id: 'game',
  initial: 'intro',
  states: {
    intro: {
      on: { TIME: 'play' },
    },
    play: {
      on: { TIME: 'result' },
    },
    result: {
      on: { TIME: 'intro' },
    },
  },
});

export default roundMachine;
