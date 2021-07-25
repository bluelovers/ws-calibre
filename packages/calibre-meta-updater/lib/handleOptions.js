"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleOptions = void 0;
const index_1 = require("../../calibre-env/index");
const path_1 = require("path");
function handleOptions(options) {
    var _a, _b, _c, _d;
    options !== null && options !== void 0 ? options : (options = {});
    options = {
        ...options,
    };
    (_a = options.cwd) !== null && _a !== void 0 ? _a : (options.cwd = process.cwd());
    (_b = options.calibrePath) !== null && _b !== void 0 ? _b : (options.calibrePath = (_c = (0, index_1.envCalibrePath)()) !== null && _c !== void 0 ? _c : options.cwd);
    (_d = options.spawnOptions) !== null && _d !== void 0 ? _d : (options.spawnOptions = {});
    options.spawnOptions.env = {
        ...process.env,
        ...options.spawnOptions.env,
    };
    options.spawnOptions.env.PATH = [
        options.calibrePath,
        (0, path_1.resolve)(options.calibrePath, 'Calibre'),
        options.spawnOptions.env.PATH,
    ].filter(Boolean).join(path_1.delimiter);
    options.spawnOptions.cwd = options.cwd;
    return options;
}
exports.handleOptions = handleOptions;
//# sourceMappingURL=handleOptions.js.map