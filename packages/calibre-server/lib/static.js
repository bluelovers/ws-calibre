"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const log_1 = require("./log");
function disallowStatic(req, res, next) {
    if (/\.(?:json|js|db|ini|zip|rar)$/i.test(req.url)) {
        log_1.console.warn(...log_1.logRequest(req, res));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3RhdGljLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQXFGO0FBRXJGLCtCQUE0QztBQUU1QyxTQUFnQixjQUFjLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQjtJQUU3RSxJQUFJLGdDQUFnQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQ2xEO1FBQ0MsYUFBTyxDQUFDLElBQUksQ0FBQyxHQUFHLGdCQUFVLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdEMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNwQjtTQUVEO1FBQ0MsSUFBSSxFQUFFLENBQUM7S0FDUDtBQUNGLENBQUM7QUFYRCx3Q0FXQztBQUVELFNBQWdCLFdBQVcsQ0FBQyxJQUFZLEVBQUUsT0FBNEI7SUFFckUsT0FBTyxDQUFDLGNBQWMsRUFBRSxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQTtBQUN2RCxDQUFDO0FBSEQsa0NBR0M7QUFFRCxrQkFBZSxXQUFXLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcywgeyBFeHByZXNzLCBSZXF1ZXN0LCBSZXNwb25zZSwgSGFuZGxlciwgTmV4dEZ1bmN0aW9uIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgeyBTZXJ2ZVN0YXRpY09wdGlvbnMgfSBmcm9tICdzZXJ2ZS1zdGF0aWMnO1xuaW1wb3J0IHsgY29uc29sZSwgbG9nUmVxdWVzdCB9IGZyb20gJy4vbG9nJztcblxuZXhwb3J0IGZ1bmN0aW9uIGRpc2FsbG93U3RhdGljKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKVxue1xuXHRpZiAoL1xcLig/Ompzb258anN8ZGJ8aW5pfHppcHxyYXIpJC9pLnRlc3QocmVxLnVybCkpXG5cdHtcblx0XHRjb25zb2xlLndhcm4oLi4ubG9nUmVxdWVzdChyZXEsIHJlcykpO1xuXHRcdHJlcy5zZW5kU3RhdHVzKDQwMyk7XG5cdH1cblx0ZWxzZVxuXHR7XG5cdFx0bmV4dCgpO1xuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGF0aWNFeHRyYShyb290OiBzdHJpbmcsIG9wdGlvbnM/OiBTZXJ2ZVN0YXRpY09wdGlvbnMpOiBIYW5kbGVyW11cbntcblx0cmV0dXJuIFtkaXNhbGxvd1N0YXRpYywgZXhwcmVzcy5zdGF0aWMocm9vdCwgb3B0aW9ucyldXG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0YXRpY0V4dHJhXG4iXX0=