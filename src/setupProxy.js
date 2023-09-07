// src/setupProxy.js

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    // 프록시 설정: /user/signIn 경로로 오는 요청을 대상 서버로 전달
    app.use(
        '/user/signIn',
        createProxyMiddleware({
            target: 'https://port-0-i-checker-api-6w1j2alm0e2xsq.sel5.cloudtype.app',
            changeOrigin: true,
        })
    );

    // 프록시 설정: /user/signUp 경로로 오는 요청을 대상 서버로 전달
    app.use(
        '/user/signUp',
        createProxyMiddleware({
            target: 'https://port-0-i-checker-api-6w1j2alm0e2xsq.sel5.cloudtype.app',
            changeOrigin: true,
        })
    );
};
