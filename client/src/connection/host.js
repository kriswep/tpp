import SimplePeer from 'simple-peer';
import EventEmitter from 'eventemitter3';
import { v4 as uuid } from 'uuid';

import { socketUrl } from '../constants';

const id = uuid();

let emitter = new EventEmitter();
let peers = [];

let closeCallback;

export default function(channel, name) {
  const socket = new WebSocket(socketUrl);
  socket.addEventListener('close', function(event) {
    console.log('Socket closed');

    emitter = new EventEmitter();
    closeCallback && closeCallback(event.reason);
    closeCallback = null;
  });
  socket.addEventListener('error', function(err) {
    console.log('Socket error', err);
  });
  socket.addEventListener('open', function() {
    console.log('WS connected');

    socket.send(JSON.stringify({ type: 'host', channel, name, id }));
  });
  socket.addEventListener('message', function(event) {
    const data = event.data;
    const dataObj = JSON.parse(data);
    if (dataObj.type === 'offer') {
      const rtc = new SimplePeer({ initiator: false, trickle: false });

      rtc.signal(dataObj);
      rtc.on('signal', function(data) {
        socket.readyState === WebSocket.OPEN &&
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

      rtc.on('close', function() {
        console.log('peer connection closed');
      });

      rtc.on('error', function(err) {
        console.log(`rtc error: ${err}`);
      });
    }

    // Fallback: broadcast per WS
    if (dataObj.type === 'gamestate' || dataObj.type === 'card') {
      emitter.emit('message', data);
      socket.send(data);
    }
  });

  const host = {
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
      // send to connected wrtc peers
      peers
        .filter(p => p.connected)
        .forEach(function(p) {
          p.send(message);
        });
      // send via ws as fallback
      if (socket.readyState === WebSocket.OPEN) {
        const origMessage = JSON.parse(message);
        socket.send(
          JSON.stringify({
            ...origMessage,
            id: { ...origMessage.id, id },
          }),
        );
      }
    },

    onMessage: function(callback) {
      emitter.on('message', callback);
    },

    onClose: function(callback) {
      closeCallback = callback;
    },
  };
  return host;
}
