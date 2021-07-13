"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moment = void 0;
const tslib_1 = require("tslib");
const moment_timezone_1 = (0, tslib_1.__importDefault)(require("moment-timezone"));
exports.moment = moment_timezone_1.default;
moment_timezone_1.default.tz.setDefault("Asia/Taipei");
exports.default = moment_timezone_1.default;
//# sourceMappingURL=moment.js.map