"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSync = exports.buildAsync = exports.initMain = void 0;
const tslib_1 = require("tslib");
const opds_extra_1 = require("opds-extra");
const bluebird_1 = (0, tslib_1.__importDefault)(require("bluebird"));
function initMain(json, options) {
    return opds_extra_1.OPDSV1.Feed.deserialize(json, options);
}
exports.initMain = initMain;
function buildAsync(feed, fns) {
    return bluebird_1.default.resolve(feed)
        .then((feed) => {
        return bluebird_1.default.resolve(fns)
            .reduce((feed, fn) => {
            if (fn == null) {
                return feed;
            }
            return fn(feed);
        }, feed);
    });
}
exports.buildAsync = buildAsync;
function buildSync(feed, fns) {
    return fns
        .reduce((feed, fn) => {
        if (fn == null) {
            return feed;
        }
        return fn(feed);
    }, feed);
}
exports.buildSync = buildSync;
exports.default = initMain;
//# sourceMappingURL=index.js.map