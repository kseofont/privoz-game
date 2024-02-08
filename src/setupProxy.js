const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://privoz.lavron.dev',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '',
            },
        })
    );
};
