import SimplePeer from 'simple-peer';
import SimpleWebsocket from 'simple-websocket';
import EventEmitter from 'eventemitter3';

const emitter = new EventEmitter();

const socketUrl = `ws://${window.location.hostname}:3210`;

export default function(channel, name) {
  const socket = new SimpleWebsocket(socketUrl);
  let rtc;
  socket.on('close', function() {
    console.log('Socket closed');
  });
  socket.on('error', function(err) {
    console.log('Socket error');
    console.log(err);
  });

  socket.on('connect', function() {
    console.log('WS connected');

    socket.send(JSON.stringify({ type: 'client', channel, name }));

    rtc = new SimplePeer({ initiator: true, trickle: false });
    rtc.on('signal', function(data) {
      socket.send(JSON.stringify(data));
    });

    socket.on('data', function(data) {
      data = JSON.parse(data);
      if (data.type !== 'answer') return;
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
}
