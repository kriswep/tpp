import EventEmitter from 'eventemitter3';

const emitter = new EventEmitter();

let messages = [];

export default {
  getMessages: function() {
    return messages.concat();
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
