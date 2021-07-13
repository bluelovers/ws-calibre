"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.staticExtra = exports.disallowStatic = void 0;
const tslib_1 = require("tslib");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const log_1 = require("./log");
function disallowStatic(req, res, next) {
    if (/\.(?:json|js|db|ini|zip|rar)$/i.test(req.url)) {
        log_1.console.warn(...(0, log_1.logRequest)(req, res));
        res.sendStatus(403);
    }
    else {
        next();
    }
}
exports.disallowStatic = disallowStatic;
function staticExtra(root, options) {
    return [disallowStatic, express_1.default.static(root, options)];
}
exports.staticExtra = staticExtra;
exports.default = staticExtra;
//# sourceMappingURL=static.js.map