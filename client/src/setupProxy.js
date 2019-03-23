const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/api/broker', { target: 'ws://localhost:3210', ws: true }));
};
