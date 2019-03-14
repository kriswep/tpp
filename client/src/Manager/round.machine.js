import { Machine } from 'xstate';
// import MessageStore from '../connection/MessageStore';

const roundMachine = (initial = 'intro') => {
  return Machine({
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
};

export default roundMachine;
