"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultServerOptions = void 0;
const calibre_env_1 = require("calibre-env");
function defaultServerOptions(env) {
    return {
        port: 2020,
        calibrePath: (0, calibre_env_1.envCalibrePath)(env),
    };
}
exports.defaultServerOptions = defaultServerOptions;
//# sourceMappingURL=options.js.map