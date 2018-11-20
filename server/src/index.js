const WebsocketServer = require('ws').Server;

const server = new WebsocketServer({ port: 3210 }, e =>
  console.log('Server listening'),
);
server.on('connection', socket => {
  socket.on('message', msg => {
    server.clients.forEach(other => {
      if (other === socket) {
        return;
      }

      other.send(msg);
    });
  });
});
