import SimplePeer from 'simple-peer';
import SimpleWebsocket from 'simple-websocket';
import EventEmitter from 'eventemitter3';

import { socketUrl } from '../constants';

let emitter = new EventEmitter();

let closeCallback;

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

    socket.send(
      JSON.stringify({ type: 'client', channel, name, id: socket._id }),
    );

    rtc = new SimplePeer({ initiator: true, trickle: false });
    rtc.on('signal', function(data) {
      socket.send(JSON.stringify(data));
    });

    socket.on('data', function(data) {
      const dataObj = JSON.parse(data);
      if (dataObj.type === 'answer') {
        rtc.signal(dataObj);
      } else if (!rtc.connected) {
        if (dataObj.type === 'gamestate' || dataObj.type === 'card') {
          // Fallback ws if rtc did not work
          const msg = new TextDecoder('utf-8').decode(data);
          console.log(`Data via ws: ${msg}`);
          emitter.emit('message', msg);
        }
      }
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

    rtc.on('close', function() {
      if (rtc.connected) {
        console.log('rtc closed');

        emitter = new EventEmitter();
        closeCallback && closeCallback();
        closeCallback = null;
      }
    });

    rtc.on('error', function(err) {
      console.log(`rtc error: ${err}`);
    });

    setTimeout(() => {
      // check if rtc connection worked out, otherwhise close rtc and use ws
      if (!rtc.connected) {
        emitter.emit('connected');
        rtc.destroy();
      }
    }, 1000);
  });

  const client = {
    id: {
      channel,
      name,
    },

    onReady: function(callback) {
      emitter.on('connected', callback);
    },

    send: function(message) {
      if (rtc.connected) {
        rtc.send(message);
      } else if (socket.connected) {
        // socket.send({message});
        const origMessage = JSON.parse(message);
        socket.send(
          JSON.stringify({
            ...origMessage,
            id: { ...origMessage.id, id: socket._id },
          }),
        );
      }
    },

    onMessage: function(cb) {
      emitter.on('message', cb);
    },

    onClose: function(callback) {
      closeCallback = callback;
    },
  };

  return client;
}
