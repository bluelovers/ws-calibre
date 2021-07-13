"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildLibraryList = exports.findLibraryFromPaths = void 0;
const tslib_1 = require("tslib");
const bluebird_1 = (0, tslib_1.__importDefault)(require("bluebird"));
const array_hyper_unique_1 = require("array-hyper-unique");
const upath2_1 = require("upath2");
const findLibrarys_1 = (0, tslib_1.__importDefault)(require("calibre-db/lib/findLibrarys"));
const crypto_1 = require("../crypto");
const loadLibrary_1 = (0, tslib_1.__importDefault)(require("calibre-db/lib/loadLibrary"));
function findLibraryFromPaths(options) {
    return bluebird_1.default
        .resolve((0, array_hyper_unique_1.array_unique)(options.calibrePaths).map(v => (0, upath2_1.resolve)(options.cwd, v)))
        .reduce(async (list, cwd) => {
        let lp = (0, findLibrarys_1.default)({
            cwd,
        });
        if (options.dbFilter) {
            lp = lp.filter(options.dbFilter);
        }
        await lp.tap(ls => list.push(...ls));
        return list;
    }, []);
}
exports.findLibraryFromPaths = findLibraryFromPaths;
function buildLibraryList(options) {
    return findLibraryFromPaths(options)
        .reduce(async (a, row) => {
        let id = (0, crypto_1.hash_sha1)(row._fullpath);
        a[id] = {
            ...row,
            id,
            db: null,
            lazyload() {
                a[id].lazyload = () => bluebird_1.default.resolve(a[id].db);
                return (0, loadLibrary_1.default)(row)
                    .tap(db => {
                    a[id].db = db;
                });
            },
        };
        return a;
    }, {});
}
exports.buildLibraryList = buildLibraryList;
//# sourceMappingURL=buildList.js.map