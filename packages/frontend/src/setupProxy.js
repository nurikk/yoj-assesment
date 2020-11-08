const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/clients', { target: 'ws://localhost:4001', ws: true }));
};
