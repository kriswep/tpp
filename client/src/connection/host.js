var SimplePeer = require('simple-peer');
var SimpleWebsocket = require('simple-websocket');
var EventEmitter = require('eventemitter3');

var peers = [];
var emitter = new EventEmitter();

const socketUrl = `ws://${window.location.hostname}:3210`;

module.exports = function() {
  var socket = new SimpleWebsocket(socketUrl);
  socket.on('close', function() {
    console.log('Socket closed');
  });
  socket.on('error', function(err) {
    console.log('Socket error');
    console.log(err);
  });
  socket.on('connect', function() {
    console.log('Connected');

    socket.on('data', function(data) {
      data = JSON.parse(data);
      console.log(`Data via socket: ${data}`);
      var rtc = new SimplePeer({ initiator: false, trickle: false });

      rtc.signal(data);
      rtc.on('signal', function(data) {
        console.log(`signal: ${data}`);
        socket.send(JSON.stringify(data));
      });

      rtc.on('connect', function() {
        peers.push(rtc);
      });

      rtc.on('data', function(message) {
        const msg = new TextDecoder('utf-8').decode(message);
        console.log(`Data via rtc: ${msg}`);
        emitter.emit('message', msg);

        //as host, we need to broadcast the data to the other peers
        peers.forEach(function(p) {
          if (p === rtc) {
            return;
          }

          p.send(msg);
        });
      });
    });
  });

  return {
    onReady: function(callback) {
      //the host is always "ready" although it may
      //not have any clients
      callback();
    },

    send: function(message) {
      peers.forEach(function(p) {
        p.send(message);
      });
    },

    onMessage: function(callback) {
      emitter.on('message', callback);
    },
  };
};
