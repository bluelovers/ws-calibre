"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logRequest = exports.consoleDebug = exports.console = void 0;
const debug_color2_1 = require("debug-color2");
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
exports.consoleDebug = exports.console;
exports.console.setOptions({
    label: true,
    enabled: true,
});
function logRequest(req, res) {
    return [req.method, [req.baseUrl, req.url].join(''), req.query];
}
exports.logRequest = logRequest;
exports.default = exports.console;
//# sourceMappingURL=log.js.map