import { Machine } from 'xstate';
import MessageStore from '../connection/MessageStore';

//TODO
const roundMachine = (initial = 'intro') => {
  // const roundMachine = () => {
  const allMessages = MessageStore.getMessages();
  let lastState = allMessages
    .filter(msg => {
      try {
        const message = JSON.parse(msg);
        return message.type === 'gamestate';
      } catch (e) {
        return false;
      }
    })
    .pop();
  // const initial =
  //   lastState && lastState.current && lastState.current.value
  //     ? lastState.current.value
  //     : 'intro';
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
