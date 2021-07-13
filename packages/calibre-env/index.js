"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envCalibrePath = exports.calibreEnv = void 0;
function calibreEnv(env) {
    if (typeof process !== 'undefined') {
        env !== null && env !== void 0 ? env : (env = process.env);
    }
    env !== null && env !== void 0 ? env : (env = {});
    if (env.CALIBRE_PATH === '') {
        delete env.CALIBRE_PATH;
    }
    return env;
}
exports.calibreEnv = calibreEnv;
function envCalibrePath(env) {
    return calibreEnv(env).CALIBRE_PATH;
}
exports.envCalibrePath = envCalibrePath;
exports.default = calibreEnv;
//# sourceMappingURL=index.js.map