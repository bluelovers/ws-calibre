"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadLibrary = void 0;
const DB_1 = require("./DB");
function loadLibrary(dbEntry) {
    return (0, DB_1.createDB)(dbEntry.name, dbEntry._fullpath);
}
exports.loadLibrary = loadLibrary;
exports.default = loadLibrary;
//# sourceMappingURL=loadLibrary.js.map