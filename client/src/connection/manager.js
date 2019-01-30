import EventEmitter from 'eventemitter3';

import ClientConnection from './client';
import HostConnection from './host';

export const CONNECTION_TYPE = {
  HOST: 10,
  PLAYER: 20,
  SPECTATOR: 30,
};
let connection = null;
let connectionType = null;
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
  getId: function() {
    return connection && connection.id;
  },

  isHost: function() {
    return connectionType === CONNECTION_TYPE.HOST;
  },

  isPlayer: function() {
    return connectionType === CONNECTION_TYPE.PLAYER;
  },

  isSpectator: function() {
    return connectionType === CONNECTION_TYPE.SPECTATOR;
  },

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

  host: function(channel, name) {
    setupConnection(HostConnection(channel, name));
    connectionType = CONNECTION_TYPE.HOST;
  },

  join: function(channel, name) {
    setupConnection(ClientConnection(channel, name));
  },
};
