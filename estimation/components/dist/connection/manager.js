"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CONNECTION_TYPE = void 0;

var _eventemitter = _interopRequireDefault(require("eventemitter3"));

var _client = _interopRequireDefault(require("./client"));

var _host = _interopRequireDefault(require("./host"));

const CONNECTION_TYPE = {
  HOST: 10,
  PLAYER: 20,
  SPECTATOR: 30
};
exports.CONNECTION_TYPE = CONNECTION_TYPE;
let connection = null;
let connectionType = null;
const emitter = new _eventemitter.default();

function setupConnection(conn) {
  conn.onReady(function () {
    connection = conn;
    emitter.emit('status');
  });
  conn.onMessage(function (msg) {
    emitter.emit('message', msg);
  });
  conn.onClose(closeConnection);
}

function closeConnection(reason) {
  console.log('closing connection for', reason);
  connection = null;
  connectionType = null;
  let error;

  try {
    error = JSON.parse(reason);
  } catch (e) {}

  emitter.emit('error', error);
}

var _default = {
  getId: function () {
    return connection && connection.id;
  },
  isHost: function () {
    return connectionType === CONNECTION_TYPE.HOST;
  },
  isPlayer: function () {
    return connectionType === CONNECTION_TYPE.PLAYER;
  },
  isSpectator: function () {
    return connectionType === CONNECTION_TYPE.SPECTATOR;
  },
  isConnected: function () {
    return connection !== null;
  },
  sendMessage: function (message) {
    connection.send(message);
  },
  onMessage: function (cb) {
    emitter.on('message', cb);
  },
  onError: function (cb) {
    emitter.on('error', cb);
  },
  onStatusChange: function (cb) {
    emitter.on('status', cb);
  },
  offMessage: function (cb) {
    emitter.off('message', cb);
  },
  offError: function (cb) {
    emitter.off('error', cb);
  },
  offStatusChange: function (cb) {
    emitter.off('status', cb);
  },
  host: function (channel, name, event) {
    event.preventDefault();
    setupConnection((0, _host.default)(channel, name));
    connectionType = CONNECTION_TYPE.HOST;
  },
  join: function (channel, name, event) {
    event.preventDefault();
    setupConnection((0, _client.default)(channel, name));
  },
  onClose: function () {
    closeConnection();
  }
};
exports.default = _default;