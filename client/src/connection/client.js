var SimplePeer = require('simple-peer');
var SimpleWebsocket = require('simple-websocket');
var EventEmitter = require('eventemitter3');

var emitter = new EventEmitter();

const socketUrl = `ws://${window.location.hostname}:3210`;

module.exports = function() {
  var socket = new SimpleWebsocket(socketUrl);
  var rtc;
  socket.on('close', function() {
    console.log('Socket closed');
  });
  socket.on('error', function(err) {
    console.log('Socket error');
    console.log(err);
  });

  socket.on('connect', function() {
    rtc = new SimplePeer({ initiator: true, trickle: false });
    rtc.on('signal', function(data) {
      console.log(`signal: ${data}`);
      socket.send(JSON.stringify(data));
    });

    socket.on('data', function(data) {
      data = JSON.parse(data);
      console.log(`Data via socket: ${data}`);
      rtc.signal(data);
    });

    rtc.on('connect', function() {
      emitter.emit('connected');
      //we no longer need the signaler
      socket.destroy();
    });

    rtc.on('data', function(message) {
      const msg = new TextDecoder('utf-8').decode(message);
      console.log(`Data via rtc: ${msg}`);
      emitter.emit('message', msg);
    });
  });

  return {
    onReady: function(callback) {
      emitter.on('connected', callback);
    },

    send: function(message) {
      rtc.send(message);
    },

    onMessage: function(cb) {
      emitter.on('message', cb);
    },
  };
};
