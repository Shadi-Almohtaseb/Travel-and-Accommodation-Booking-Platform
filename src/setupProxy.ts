const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app: any) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net',
      changeOrigin: true,
    })
  );
};
