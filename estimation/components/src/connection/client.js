import SimplePeer from 'simple-peer/simplepeer.min';
// import SimplePeer from 'simple-peer';
import EventEmitter from 'eventemitter3';
import uuid from 'uuid/v4';

import { socketUrl } from '../constants';

const id = uuid();

let emitter = new EventEmitter();

let closeCallback;

export default function(channel, name) {
  const socket = new WebSocket(socketUrl);
  let rtc;
  socket.addEventListener('close', function(event) {
    console.log('Socket closed', event);
    if (!rtc.connected) {
      // no rtc, then closing ws connection is crucial
      emitter = new EventEmitter();
      closeCallback && closeCallback(event.reason);
      closeCallback = null;
    }
  });
  socket.addEventListener('error', function(err) {
    console.log('Socket error', err);
  });

  socket.addEventListener('open', function() {
    console.log('WS connected');

    socket.send(JSON.stringify({ type: 'client', channel, name, id }));

    rtc = new SimplePeer({ initiator: true, trickle: false });
    rtc.on('signal', function(data) {
      socket.readyState === WebSocket.OPEN && socket.send(JSON.stringify(data));
    });

    socket.addEventListener('message', function(event) {
      const data = event.data;
      const dataObj = JSON.parse(data);
      if (dataObj.type === 'answer') {
        rtc && rtc.signal(dataObj);
      } else if (!rtc.connected) {
        if (dataObj.type === 'gamestate' || dataObj.type === 'card') {
          // Fallback ws if rtc did not work
          console.log(`Data via ws: ${data}`);
          emitter.emit('message', data);
        }
      }
    });

    rtc.on('connect', function() {
      emitter.emit('connected');
      //we no longer need the signaler
      socket.close();
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
        rtc = false;
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
      } else if (socket.readyState === WebSocket.OPEN) {
        // socket.send({message});
        const origMessage = JSON.parse(message);
        socket.send(
          JSON.stringify({
            ...origMessage,
            id: { ...origMessage.id, id },
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
