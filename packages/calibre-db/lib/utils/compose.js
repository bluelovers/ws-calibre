"use strict";
/**
 * Created by user on 2020/1/14.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.compose = void 0;
function compose(...fns) {
    const length = fns.length;
    return function processRow(row, index) {
        let i = 0;
        while (i < length) {
            const fn = fns[i++];
            row = fn(row, index);
        }
        return row;
    };
}
exports.compose = compose;
exports.default = compose;
//# sourceMappingURL=compose.js.map