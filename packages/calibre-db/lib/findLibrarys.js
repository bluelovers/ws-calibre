"use strict";
/**
 * Created by user on 2020/1/14.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.findLibrarys = void 0;
const tslib_1 = require("tslib");
const bluebird_1 = (0, tslib_1.__importDefault)(require("@bluelovers/fast-glob/bluebird"));
const upath2_1 = require("upath2");
function findLibrarys(options) {
    const { cwd } = options;
    return (0, bluebird_1.default)([
        '*/metadata.db',
    ], {
        cwd,
    })
        .map(_path => {
        let _fullpath = (0, upath2_1.join)(cwd, _path);
        let name = (0, upath2_1.dirname)(_path);
        return {
            name,
            _path,
            _fullpath,
            _fulldir: (0, upath2_1.dirname)(_fullpath),
        };
    });
}
exports.findLibrarys = findLibrarys;
exports.default = findLibrarys;
//# sourceMappingURL=findLibrarys.js.map