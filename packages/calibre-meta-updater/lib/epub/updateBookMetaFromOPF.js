"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBookMetaFromOPF = void 0;
const cross_spawn_extra_1 = require("cross-spawn-extra");
const path_1 = require("path");
function updateBookMetaFromOPF(target, options) {
    var _a;
    target = (0, path_1.resolve)(options.cwd, target);
    let from = (_a = options.from) !== null && _a !== void 0 ? _a : 'metadata.opf';
    from = (0, path_1.resolve)((0, path_1.dirname)(target), from);
    return (0, cross_spawn_extra_1.async)('ebook-meta', [
        target,
        '--from-opf',
        from,
    ], options.spawnOptions);
}
exports.updateBookMetaFromOPF = updateBookMetaFromOPF;
//# sourceMappingURL=updateBookMetaFromOPF.js.map