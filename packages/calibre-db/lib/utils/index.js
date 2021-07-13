"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoverPath = exports.getFilePath = exports.strip001 = void 0;
const tslib_1 = require("tslib");
const fileext_1 = (0, tslib_1.__importDefault)(require("./fileext"));
function strip001(v) {
    return v.replace(/'/g, '\\\'');
}
exports.strip001 = strip001;
function getFilePath(file, book) {
    return [encodeURI(book.book_path), encodeURIComponent(strip001(file.data_name))].join('/') + '.' + (0, fileext_1.default)(file.data_format);
}
exports.getFilePath = getFilePath;
function getCoverPath(book) {
    return [encodeURI(book.book_path), 'cover.jpg'].join('/');
}
exports.getCoverPath = getCoverPath;
//# sourceMappingURL=index.js.map