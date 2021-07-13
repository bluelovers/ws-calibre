"use strict";
/**
 * Created by user on 2020/1/14.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.hash_sha1 = void 0;
const tslib_1 = require("tslib");
const crypto_1 = (0, tslib_1.__importDefault)(require("crypto"));
function hash_sha1(input) {
    const shasum = crypto_1.default.createHash('sha1');
    shasum.update(input);
    return shasum.digest('hex').slice(0, 6);
}
exports.hash_sha1 = hash_sha1;
//# sourceMappingURL=crypto.js.map