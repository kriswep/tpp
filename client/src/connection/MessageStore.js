import EventEmitter from 'eventemitter3';

const emitter = new EventEmitter();

let messages = [];

export default {
  getMessages: function() {
    return messages.concat();
  },

  getPlayedCards: function() {
    const playedCards = [];
    for (let index = messages.length - 1; index >= 0; index--) {
      try {
        const message = JSON.parse(messages[index]);
        if (message.type === 'card' && message.card && message.id) {
          playedCards.push(message);
          continue;
        }
        // read until last gamestate with value 2
        if (
          message.type === 'gamestate' &&
          message.state &&
          message.state.value === 'play'
        ) {
          break;
        }
      } catch {}
    }
    return playedCards;
  },

  subscribe: function(callback) {
    emitter.on('update', callback);
  },

  unsubscribe: function(callback) {
    emitter.off('update', callback);
  },

  newMessage: function(message) {
    messages.push(message);
    emitter.emit('update');
  },
};
