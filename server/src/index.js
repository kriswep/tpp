const WebsocketServer = require('ws').Server;

const channels = new Map();

const server = new WebsocketServer({ port: 3210, clientTracking: false }, e =>
  console.log('Server listening'),
);

server.on('connection', socket => {
  socket.on('message', msg => {
    let message;
    try {
      message = JSON.parse(msg);
    } catch (e) {}
    if (message && message.type === 'host' && message.channel) {
      if (channels.get(message.channel)) {
        return error(socket, 'channel used');
      }
      socket.channel = message.channel;
      return channels.set(message.channel, [
        { type: message.type, name: message.name, socket },
      ]);
    }
    if (message && message.type === 'client' && message.channel) {
      const channel = channels.get(message.channel);
      if (!channel) {
        return error(socket, 'channel unknown');
      }
      socket.channel = message.channel;
      return channels.set(message.channel, [
        ...channel,
        { type: message.type, name: message.name, socket },
      ]);
    }

    if (
      socket.channel &&
      message &&
      (message.type === 'offer' || message.type === 'answer')
    ) {
      const channel = channels.get(socket.channel);
      return channel.forEach(other => {
        if (
          other.socket === socket ||
          other.socket.readyState !== other.socket.OPEN
        ) {
          return;
        }

        other.socket.send(msg);
      });
    }

    return error(socket, 'invalid message');
  });
});

const error = (socket, message) =>
  socket.send(JSON.stringify({ error: true, message }));
