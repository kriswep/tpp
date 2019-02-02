const WebsocketServer = require('ws').Server;

const channels = new Map();

const server = new WebsocketServer({ port: 3210, clientTracking: false }, e =>
  console.log('Server listening'),
);

server.on('connection', (socket, req) => {
  socket.on('message', msg => {
    const ip =
      (req &&
        (req.headers['x-forwarded-for'] &&
          req.headers['x-forwarded-for'].split(/\s*,\s*/)[0])) ||
      (req.connection && req.connection.remoteAddress);
    let message;
    try {
      message = JSON.parse(msg);
    } catch (e) {}
    if (message && message.type === 'host' && message.channel) {
      if (channels.get(message.channel)) {
        console.log(
          `Host ${ip} tried to connect channel ${
            message.channel
          }. But it was used.`,
        );
        return error(socket, 'channel used');
      }
      socket.channel = message.channel;
      console.log(`Host ${ip}  in channel ${socket.channel} connected.`);
      return channels.set(message.channel, [
        { type: message.type, name: message.name, socket },
      ]);
    }
    if (message && message.type === 'client' && message.channel) {
      const channel = channels.get(message.channel);
      if (!channel) {
        console.log(
          `Client ${ip}  tried to connect channel ${
            socket.channel
          }. But it didn't exist.`,
        );
        return error(socket, 'channel unknown');
      }
      socket.channel = message.channel;
      console.log(`Client ${ip}  in channel ${socket.channel} connected.`);

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
        console.log(`Signaling ${ip}  in channel ${socket.channel}: ${msg}`);
        other.socket.send(msg);
      });
    }

    return error(socket, 'invalid message');
  });
});

const error = (socket, message) =>
  socket.send(JSON.stringify({ error: true, message }));
