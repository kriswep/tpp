"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _simplePeer = _interopRequireDefault(require("simple-peer"));

var _eventemitter = _interopRequireDefault(require("eventemitter3"));

var _v = _interopRequireDefault(require("uuid/v4"));

var _constants = require("../constants");

// import { v4 as uuid } from 'uuid';
const id = (0, _v.default)();
let emitter = new _eventemitter.default();
let peers = [];
let closeCallback;

function _default(channel, name) {
  const socket = new WebSocket(_constants.socketUrl);
  socket.addEventListener('close', function (event) {
    console.log('Socket closed');
    emitter = new _eventemitter.default();
    closeCallback && closeCallback(event.reason);
    closeCallback = null;
  });
  socket.addEventListener('error', function (err) {
    console.log('Socket error', err);
  });
  socket.addEventListener('open', function () {
    console.log('WS connected');
    socket.send(JSON.stringify({
      type: 'host',
      channel,
      name,
      id
    }));
  });
  socket.addEventListener('message', function (event) {
    const data = event.data;
    const dataObj = JSON.parse(data);

    if (dataObj.type === 'offer') {
      const rtc = new _simplePeer.default({
        initiator: false,
        trickle: false
      });
      rtc.signal(dataObj);
      rtc.on('signal', function (data) {
        socket.readyState === WebSocket.OPEN && socket.send(JSON.stringify(data));
      });
      rtc.on('connect', function () {
        peers.push(rtc);
      });
      rtc.on('data', function (message) {
        const msg = new TextDecoder('utf-8').decode(message);
        emitter.emit('message', msg); //as host, we need to broadcast the data to the other peers

        peers.filter(p => p.connected).forEach(function (p) {
          if (p === rtc) {
            return;
          }

          p.send(msg);
        }); // and broadcast also to all websocket connected clients

        socket.send(msg);
      });
      rtc.on('close', function () {
        console.log('peer connection closed');
      });
      rtc.on('error', function (err) {
        console.log(`rtc error: ${err}`);
      });
    } // Fallback: broadcast per WS


    if (dataObj.type === 'gamestate' || dataObj.type === 'card') {
      emitter.emit('message', data);
      socket.send(data); // anb back to webrtc peers

      peers.filter(p => p.connected).forEach(function (p) {
        p.send(data);
      });
    }
  });
  return {
    id: {
      channel,
      name
    },
    onReady: function (callback) {
      //the host is always "ready" although it may
      //not have any clients
      callback();
    },
    send: function (message) {
      // send to connected wrtc peers
      peers.filter(p => p.connected).forEach(function (p) {
        p.send(message);
      }); // send via ws as fallback

      if (socket.readyState === WebSocket.OPEN) {
        const origMessage = JSON.parse(message);
        socket.send(JSON.stringify((0, _extends2.default)({}, origMessage, {
          id: (0, _extends2.default)({}, origMessage.id, {
            id
          })
        })));
      }
    },
    onMessage: function (callback) {
      emitter.on('message', callback);
    },
    onClose: function (callback) {
      closeCallback = callback;
    }
  };
}