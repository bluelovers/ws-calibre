"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultFavicon = exports.parseFavicon = void 0;
const path_1 = require("path");
const bluebird_1 = require("@bluelovers/fast-glob/bluebird");
const array_hyper_unique_1 = require("array-hyper-unique");
function parseFavicon(favicon) {
    if (typeof favicon === 'string' || Buffer.isBuffer(favicon)) {
        return favicon;
    }
    else if (typeof favicon === 'object') {
        return Buffer.from(favicon.value, favicon.type);
    }
    else if (favicon) {
        throw new TypeError(`unknown favicon data type, ${favicon}`);
    }
    return null;
}
exports.parseFavicon = parseFavicon;
function defaultFavicon(staticPath, localStatic) {
    let ls = (0, array_hyper_unique_1.array_unique)([
        staticPath,
        localStatic,
    ]);
    for (let targetPath of ls) {
        let ret = (0, bluebird_1.sync)([
            `favicon.{png,ico,bmp}`,
        ], {
            cwd: staticPath,
            absolute: true,
        });
        if (ret.length) {
            return ret[0];
        }
    }
    return (0, path_1.resolve)(localStatic, `favicon.png`);
}
exports.defaultFavicon = defaultFavicon;
//# sourceMappingURL=favicon.js.map