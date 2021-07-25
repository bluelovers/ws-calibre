"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoverFromBook = void 0;
const path_1 = require("path");
const cross_spawn_extra_1 = require("cross-spawn-extra");
function getCoverFromBook(target, options) {
    target = (0, path_1.resolve)(options.cwd, target);
    let outputFile = options.filename || 'cover.jpg';
    outputFile = (0, path_1.resolve)(options.outputPath || (0, path_1.dirname)(target), outputFile);
    return (0, cross_spawn_extra_1.async)('ebook-meta', [
        `--get-cover=${outputFile}`,
        target,
    ], options.spawnOptions);
}
exports.getCoverFromBook = getCoverFromBook;
//# sourceMappingURL=getCoverFromBook.js.map