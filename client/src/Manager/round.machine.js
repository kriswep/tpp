import { Machine } from 'xstate';

const roundMachine = (initial = 'intro') =>
  Machine({
    id: 'game',
    initial,
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
