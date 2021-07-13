"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadLibrary = void 0;
const tslib_1 = require("tslib");
const DB_1 = (0, tslib_1.__importDefault)(require("./DB"));
function loadLibrary(row) {
    return (0, DB_1.default)(row.name, row._fullpath);
}
exports.loadLibrary = loadLibrary;
exports.default = loadLibrary;
//# sourceMappingURL=loadLibrary.js.map