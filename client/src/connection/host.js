import SimplePeer from 'simple-peer';
import SimpleWebsocket from 'simple-websocket';
import EventEmitter from 'eventemitter3';

const emitter = new EventEmitter();
let peers = [];

const socketUrl = `ws://${window.location.hostname}:3210`;

export default function(channel, name) {
  const socket = new SimpleWebsocket(socketUrl);
  socket.on('close', function() {
    console.log('Socket closed');
  });
  socket.on('error', function(err) {
    console.log('Socket error');
    console.log(err);
  });
  socket.on('connect', function() {
    console.log('WS connected');

    socket.send(JSON.stringify({ type: 'host', channel, name }));
  });
  socket.on('data', function(data) {
    data = JSON.parse(data);
    if (data.type !== 'offer') return;
    const rtc = new SimplePeer({ initiator: false, trickle: false });

    rtc.signal(data);
    rtc.on('signal', function(data) {
      socket.send(JSON.stringify(data));
    });

    rtc.on('connect', function() {
      peers.push(rtc);
    });

    rtc.on('data', function(message) {
      const msg = new TextDecoder('utf-8').decode(message);
      emitter.emit('message', msg);

      //as host, we need to broadcast the data to the other peers
      peers
        .filter(p => p.connected)
        .forEach(function(p) {
          if (p === rtc) {
            return;
          }

          p.send(msg);
        });
    });
  });

  return {
    id: {
      channel,
      name,
    },

    onReady: function(callback) {
      //the host is always "ready" although it may
      //not have any clients
      callback();
    },

    send: function(message) {
      peers
        .filter(p => p.connected)
        .forEach(function(p) {
          p.send(message);
        });
    },

    onMessage: function(callback) {
      emitter.on('message', callback);
    },
  };
}
