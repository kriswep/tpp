import EventEmitter from 'eventemitter3';

import ClientConnection from './client';
import HostConnection from './host';

let connection = null;
const emitter = new EventEmitter();

function setupConnection(conn) {
  conn.onReady(function() {
    connection = conn;
    emitter.emit('status');
  });

  conn.onMessage(function(msg) {
    emitter.emit('message', msg);
  });
}

export default {
  isConnected: function() {
    return connection !== null;
  },

  sendMessage: function(message) {
    connection.send(message);
  },

  onMessage: function(cb) {
    emitter.on('message', cb);
  },

  onStatusChange: function(cb) {
    emitter.on('status', cb);
  },

  offMessage: function(cb) {
    emitter.off('message', cb);
  },

  offStatusChange: function(cb) {
    emitter.off('status', cb);
  },

  host: function() {
    setupConnection(HostConnection());
  },

  join: function() {
    setupConnection(ClientConnection());
  },
};
