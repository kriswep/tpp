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
      socket.host = true;
      console.log(`Host ${ip} in channel ${socket.channel} connected.`);
      return channels.set(message.channel, [
        { type: message.type, name: message.name, id: message.id, socket },
      ]);
    }
    if (message && message.type === 'client' && message.channel) {
      const channel = channels.get(message.channel);
      if (!channel) {
        console.log(
          `Client ${ip} tried to connect channel ${
            socket.channel
          }. But it didn't exist.`,
        );
        return error(socket, 'channel unknown');
      }
      socket.channel = message.channel;
      console.log(`Client ${ip} in channel ${socket.channel} connected.`);

      return channels.set(message.channel, [
        ...channel,
        { type: message.type, name: message.name, id: message.id, socket },
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
        console.log(`Signaling ${ip} in channel ${socket.channel}: ${msg}`);
        other.socket.send(msg);
      });
    }

    // team broadcast alternative per websocket, on all connected if host
    if (
      socket.channel &&
      socket.host &&
      message &&
      (message.type === 'gamestate' || message.type === 'card')
    ) {
      console.log(`Message ${ip} in channel ${socket.channel}: ${msg}`);

      const channel = channels.get(socket.channel);
      return channel
        .filter(other => other.type === 'client') // only to client
        .forEach(other => {
          if (
            other.socket === socket ||
            other.socket.readyState !== other.socket.OPEN
          ) {
            return;
          }
          console.log(other);
          if (other.id !== message.id || !message.id) {
            other.socket.send(msg);
          }
        });
    }

    // broadcast alternative per websocket, to host if not host
    if (
      socket.channel &&
      !socket.host &&
      message &&
      (message.type === 'gamestate' || message.type === 'card')
    ) {
      console.log(`Message ${ip} in channel ${socket.channel}: ${msg}`);

      const channel = channels.get(socket.channel);
      return channel
        .filter(({ socket }) => socket.readyState === socket.OPEN)
        .filter(other => other.type === 'host') // only to host
        .forEach(other => {
          if (
            other.socket === socket ||
            other.socket.readyState !== other.socket.OPEN
          ) {
            return;
          }
          if (other.id !== message.id || !message.id) {
            other.socket.send(msg);
          }
        });
    }
    return error(socket, 'invalid message');
  });

  socket.on('close', (code, reason) => {
    const ip =
      (req &&
        (req.headers['x-forwarded-for'] &&
          req.headers['x-forwarded-for'].split(/\s*,\s*/)[0])) ||
      (req.connection && req.connection.remoteAddress);
    console.log(
      `Socket ${ip} in channel ${
        socket.channel
      } closed with ${code}. Reason: ${reason}`,
    );
    closeChannelWhenEmpty(socket.channel);
  });
});

// housekeeping
const interval = setInterval(function housekeeping() {
  channels.forEach((channel, key) => {
    channel
      .filter(({ socket }) => socket.readyState === socket.OPEN)
      .map(({ socket }) => {
        socket.ping(() => {});
        // socket.send(JSON.stringify({ type: 'heartbeat' }));
      });

    closeChannelWhenEmpty(key);
  });
}, 20000);

// Todo: close channels and socket without host

const closeChannelWhenEmpty = channel => {
  const activeChannel = channels.get(channel);
  const activeConnections = !activeChannel
    ? [] // so it doesn't crash when channel does not exist
    : activeChannel.filter(({ socket }) => socket.readyState === socket.OPEN);
  if (activeConnections.length <= 0) {
    channels.delete(channel);
    console.log(`Channel ${channel} was closed.`);
  }
};

const error = (socket, message) =>
  socket.send(JSON.stringify({ error: true, message }));
