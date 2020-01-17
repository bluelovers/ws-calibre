"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_http_proxy_1 = __importDefault(require("express-http-proxy"));
const express_1 = __importDefault(require("express"));
const debug_color2_1 = require("debug-color2");
const address2_1 = __importDefault(require("address2"));
const qrcode_terminal_1 = require("qrcode-terminal");
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
    const app = express_1.default();
    if (!target) {
        target = `http://127.0.0.1:${targetPort}`;
    }
    app.use('/', express_http_proxy_1.default(target, {
        userResHeaderDecorator(headers, userReq, userRes, proxyReq, proxyRes) {
            let contentType = headers['content-type'];
            headers['content-type'] = contentType.replace(/atom\+xml/, 'xml');
            return headers;
        },
        memoizeHost: true,
    }));
    let _app = app.listen(port, function (...argv) {
        let address = this.address();
        let ip = address2_1.default();
        let href = `http://${ip}:${address.port}`;
        qrcode_terminal_1.generate(href, { small: true });
        exports.console.success(`伺服器成功啟動`);
        exports.console.success(`將以 ${href} 代理 ${target}`);
        if (ip !== '127.0.0.1') {
            let ip = '127.0.0.1';
            href = `http://${ip}:${address.port}`;
            exports.console.success(`將以 ${href} 代理 ${target}`);
        }
    });
    return _app;
}
exports.createServer = createServer;
exports.default = createServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDRFQUF1QztBQUN2QyxzREFBOEI7QUFDOUIsK0NBQXdDO0FBSXhDLHdEQUF1QztBQUN2QyxxREFBcUQ7QUFFeEMsUUFBQSxPQUFPLEdBQUcsSUFBSSx1QkFBUSxDQUFDLElBQUksRUFBRTtJQUN6QyxZQUFZLEVBQUU7UUFDYixPQUFPLEVBQUUsSUFBSTtLQUNiO0lBQ0QsY0FBYyxFQUFFO1FBQ2YsTUFBTSxFQUFFLElBQUk7UUFDWixLQUFLLEVBQUUsQ0FBQztLQUNSO0lBQ0QsS0FBSyxFQUFFLElBQUk7SUFDWCxJQUFJLEVBQUUsSUFBSTtDQUNWLENBQUMsQ0FBQztBQUVILGVBQU8sQ0FBQyxVQUFVLENBQUM7SUFDbEIsS0FBSyxFQUFFLElBQUk7SUFDWCxPQUFPLEVBQUUsSUFBSTtDQUNiLENBQUMsQ0FBQztBQUVILFNBQWdCLFlBQVksQ0FBQyxVQUl6QixFQUFFO0lBRUwsSUFBSSxFQUFFLElBQUksR0FBRyxFQUFFLEVBQUUsVUFBVSxHQUFHLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUM7SUFFdkQsTUFBTSxHQUFHLEdBQUcsaUJBQU8sRUFBRSxDQUFDO0lBRXRCLElBQUksQ0FBQyxNQUFNLEVBQ1g7UUFDQyxNQUFNLEdBQUcsb0JBQW9CLFVBQVUsRUFBRSxDQUFDO0tBQzFDO0lBRUQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsNEJBQUssQ0FBQyxNQUFNLEVBQUU7UUFDMUIsc0JBQXNCLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVE7WUFFbkUsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNsRSxPQUFPLE9BQU8sQ0FBQTtRQUNmLENBQUM7UUFFRCxXQUFXLEVBQUUsSUFBSTtLQUNqQixDQUFDLENBQUMsQ0FBQztJQUVKLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLFVBQXdCLEdBQUcsSUFBSTtRQUUxRCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFpQixDQUFDO1FBRTVDLElBQUksRUFBRSxHQUFXLGtCQUFlLEVBQUUsQ0FBQztRQUVuQyxJQUFJLElBQUksR0FBRyxVQUFVLEVBQUUsSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFMUMsMEJBQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUU5QixlQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzNCLGVBQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLE9BQU8sTUFBTSxFQUFFLENBQUMsQ0FBQztRQUUzQyxJQUFJLEVBQUUsS0FBSyxXQUFXLEVBQ3RCO1lBQ0MsSUFBSSxFQUFFLEdBQUcsV0FBVyxDQUFDO1lBQ3JCLElBQUksR0FBRyxVQUFVLEVBQUUsSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDdEMsZUFBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksT0FBTyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1NBQzNDO0lBQ0YsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQztBQUNiLENBQUM7QUFoREQsb0NBZ0RDO0FBRUQsa0JBQWUsWUFBWSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHByb3h5IGZyb20gJ2V4cHJlc3MtaHR0cC1wcm94eSc7XG5pbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCB7IENvbnNvbGUyIH0gZnJvbSAnZGVidWctY29sb3IyJztcbmltcG9ydCB7IGluc3BlY3QgfSBmcm9tICd1dGlsJztcbmltcG9ydCB7IFNlcnZlciB9IGZyb20gJ2h0dHAnO1xuaW1wb3J0IHsgQWRkcmVzc0luZm8gfSBmcm9tIFwibmV0XCI7XG5pbXBvcnQgc2VhcmNoSVBBZGRyZXNzIGZyb20gJ2FkZHJlc3MyJztcbmltcG9ydCB7IGdlbmVyYXRlIGFzIHFyY29kZSB9IGZyb20gJ3FyY29kZS10ZXJtaW5hbCc7XG5cbmV4cG9ydCBjb25zdCBjb25zb2xlID0gbmV3IENvbnNvbGUyKG51bGwsIHtcblx0Y2hhbGtPcHRpb25zOiB7XG5cdFx0ZW5hYmxlZDogdHJ1ZSxcblx0fSxcblx0aW5zcGVjdE9wdGlvbnM6IHtcblx0XHRjb2xvcnM6IHRydWUsXG5cdFx0ZGVwdGg6IDUsXG5cdH0sXG5cdGxhYmVsOiB0cnVlLFxuXHR0aW1lOiB0cnVlLFxufSk7XG5cbmNvbnNvbGUuc2V0T3B0aW9ucyh7XG5cdGxhYmVsOiB0cnVlLFxuXHRlbmFibGVkOiB0cnVlLFxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZXJ2ZXIob3B0aW9uczoge1xuXHRwb3J0PzogbnVtYmVyLFxuXHR0YXJnZXRQb3J0PzogbnVtYmVyLFxuXHR0YXJnZXQ/OiBzdHJpbmcsXG59ID0ge30pXG57XG5cdGxldCB7IHBvcnQgPSA4MCwgdGFyZ2V0UG9ydCA9IDgwODAsIHRhcmdldCB9ID0gb3B0aW9ucztcblxuXHRjb25zdCBhcHAgPSBleHByZXNzKCk7XG5cblx0aWYgKCF0YXJnZXQpXG5cdHtcblx0XHR0YXJnZXQgPSBgaHR0cDovLzEyNy4wLjAuMToke3RhcmdldFBvcnR9YDtcblx0fVxuXG5cdGFwcC51c2UoJy8nLCBwcm94eSh0YXJnZXQsIHtcblx0XHR1c2VyUmVzSGVhZGVyRGVjb3JhdG9yKGhlYWRlcnMsIHVzZXJSZXEsIHVzZXJSZXMsIHByb3h5UmVxLCBwcm94eVJlcylcblx0XHR7XG5cdFx0XHRsZXQgY29udGVudFR5cGUgPSBoZWFkZXJzWydjb250ZW50LXR5cGUnXTtcblx0XHRcdGhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddID0gY29udGVudFR5cGUucmVwbGFjZSgvYXRvbVxcK3htbC8sICd4bWwnKTtcblx0XHRcdHJldHVybiBoZWFkZXJzXG5cdFx0fSxcblxuXHRcdG1lbW9pemVIb3N0OiB0cnVlLFxuXHR9KSk7XG5cblx0bGV0IF9hcHAgPSBhcHAubGlzdGVuKHBvcnQsIGZ1bmN0aW9uICh0aGlzOiBTZXJ2ZXIsIC4uLmFyZ3YpXG5cdHtcblx0XHRsZXQgYWRkcmVzcyA9IHRoaXMuYWRkcmVzcygpIGFzIEFkZHJlc3NJbmZvO1xuXG5cdFx0bGV0IGlwOiBzdHJpbmcgPSBzZWFyY2hJUEFkZHJlc3MoKTtcblxuXHRcdGxldCBocmVmID0gYGh0dHA6Ly8ke2lwfToke2FkZHJlc3MucG9ydH1gO1xuXG5cdFx0cXJjb2RlKGhyZWYsIHsgc21hbGw6IHRydWUgfSk7XG5cblx0XHRjb25zb2xlLnN1Y2Nlc3MoYOS8uuacjeWZqOaIkOWKn+WVn+WLlWApO1xuXHRcdGNvbnNvbGUuc3VjY2Vzcyhg5bCH5LulICR7aHJlZn0g5Luj55CGICR7dGFyZ2V0fWApO1xuXG5cdFx0aWYgKGlwICE9PSAnMTI3LjAuMC4xJylcblx0XHR7XG5cdFx0XHRsZXQgaXAgPSAnMTI3LjAuMC4xJztcblx0XHRcdGhyZWYgPSBgaHR0cDovLyR7aXB9OiR7YWRkcmVzcy5wb3J0fWA7XG5cdFx0XHRjb25zb2xlLnN1Y2Nlc3MoYOWwh+S7pSAke2hyZWZ9IOS7o+eQhiAke3RhcmdldH1gKTtcblx0XHR9XG5cdH0pO1xuXG5cdHJldHVybiBfYXBwO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVTZXJ2ZXJcbiJdfQ==