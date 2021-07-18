"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBookFile = void 0;
const fileext_1 = require("calibre-db/lib/utils/fileext");
function isBookFile(ext) {
    ext = (0, fileext_1.fileext)(ext);
    if (ext === "epub" /* EPUB */ || /cb7|cba|cbr|cbt|cbz/.test(ext)) {
        return true;
    }
    return false;
}
exports.isBookFile = isBookFile;
//# sourceMappingURL=isBookFile.js.map