import SimplePeer from 'simple-peer';
import SimpleWebsocket from 'simple-websocket';
import EventEmitter from 'eventemitter3';

import { socketUrl } from '../constants';

let emitter = new EventEmitter();
let peers = [];

let closeCallback;

export default function(channel, name) {
  const socket = new SimpleWebsocket(socketUrl);
  socket.on('close', function() {
    console.log('Socket closed');

    emitter = new EventEmitter();
    closeCallback && closeCallback();
    closeCallback = null;
  });
  socket.on('error', function(err) {
    console.log('Socket error');
    console.log(err);
  });
  socket.on('connect', function() {
    console.log('WS connected');

    socket.send(
      JSON.stringify({ type: 'host', channel, name, id: socket._id }),
    );
  });
  socket.on('data', function(data) {
    const dataObj = JSON.parse(data);
    if (dataObj.type === 'offer') {
      const rtc = new SimplePeer({ initiator: false, trickle: false });

      rtc.signal(dataObj);
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

      rtc.on('close', function() {
        console.log('peer connection closed');
      });

      rtc.on('error', function(err) {
        console.log(`rtc error: ${err}`);
      });
    }

    // Fallback: broadcast per WS
    if (dataObj.type === 'gamestate' || dataObj.type === 'card') {
      const msg = new TextDecoder('utf-8').decode(data);
      emitter.emit('message', msg);
      socket.send(msg);
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
      if (socket.connected) {
        // socket.send(message);
        socket.send(JSON.stringify({ ...JSON.parse(message), id: socket._id }));
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
