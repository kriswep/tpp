const WebsocketServer = require('ws').Server;

const server = new WebsocketServer({ port: 3210 });
server.on('connection', socket => {
  socket.on('message', msg => {
    console.log(`Received msg`, msg);
    server.clients.forEach(other => {
      if (other === socket) {
        return;
      }

      other.send(msg);
    });
  });
});
