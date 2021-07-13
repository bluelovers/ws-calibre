"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = exports.console = void 0;
const tslib_1 = require("tslib");
const express_http_proxy_1 = (0, tslib_1.__importDefault)(require("express-http-proxy"));
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const debug_color2_1 = require("debug-color2");
const address2_1 = (0, tslib_1.__importDefault)(require("address2"));
const qrcode_terminal_1 = (0, tslib_1.__importDefault)(require("qrcode-terminal"));
exports.console = new debug_color2_1.Console2(null, {
    chalkOptions: {
        enabled: true,
    },
    inspectOptions: {
        colors: true,
        depth: 5,
    },
    label: true,
    time: true,
});
exports.console.setOptions({
    label: true,
    enabled: true,
});
function createServer(options = {}) {
    let { port = 80, targetPort = 8080, target } = options;
    const app = (0, express_1.default)();
    if (!target) {
        target = `http://127.0.0.1:${targetPort}`;
    }
    app.use('/', (0, express_http_proxy_1.default)(target, {
        userResHeaderDecorator(headers, userReq, userRes, proxyReq, proxyRes) {
            let contentType = headers['content-type'];
            headers['content-type'] = contentType.replace(/atom\+xml/, 'xml');
            return headers;
        },
        memoizeHost: true,
    }));
    let _app = app.listen(port, function (...argv) {
        let address = this.address();
        let ip = (0, address2_1.default)();
        let href = `http://${ip}:${address.port}/opds`;
        qrcode_terminal_1.default.generate(href, { small: true });
        exports.console.success(`伺服器成功啟動`);
        exports.console.success(`將以 ${href} 代理 ${target}`);
        if (ip !== '127.0.0.1') {
            let ip = '127.0.0.1';
            href = `http://${ip}:${address.port}/opds`;
            exports.console.success(`將以 ${href} 代理 ${target}`);
        }
    });
    return _app;
}
exports.createServer = createServer;
exports.default = createServer;
//# sourceMappingURL=index.js.map