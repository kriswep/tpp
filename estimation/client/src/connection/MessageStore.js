import EventEmitter from 'eventemitter3';

const emitter = new EventEmitter();

let messages = [];

export default {
  getMessages: function() {
    return messages.concat();
  },

  getPlayedCards: function() {
    const playedCards = [];
    const playedEstimators = [];
    // read the properly choosen cards
    for (let index = messages.length - 1; index >= 0; index--) {
      try {
        const message = JSON.parse(messages[index]);
        if (
          message.type === 'card' &&
          message.card &&
          message.card.choosen &&
          message.id
        ) {
          playedCards.push(message);
          playedEstimators[`${message.id.id}`] = true;
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
    // read selected cards, if estimator didn't choose one
    for (let index = messages.length - 1; index >= 0; index--) {
      try {
        const message = JSON.parse(messages[index]);
        if (
          message.type === 'card' &&
          message.card &&
          !message.card.choosen &&
          message.card.selected &&
          message.id &&
          !playedEstimators[`${message.id.id}`]
        ) {
          playedCards.push(message);
          playedEstimators[`${message.id.id}`] = true;
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
    return playedCards.sort((cardA, cardB) => {
      if (cardA.card.idx < cardB.card.idx) return -1;
      if (cardA.card.idx > cardB.card.idx) return 1;
      return 0;
    });
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
