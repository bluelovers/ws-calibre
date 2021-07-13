"use strict";
/**
 * Created by user on 2020/1/14.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertiesCollapser = void 0;
function pubdate(row) {
    if (row.pubdate) {
        row.pubdate = new Date(row.pubdate);
    }
    if (row.books && row.books.length) {
        row.books.forEach(pubdate);
    }
    return row;
}
function propertiesCollapser(arr, collapsedName, regex, sep = '|') {
    const keys = Object.keys(arr[0]).filter(propName => regex.test(propName));
    const firstKey = keys[0];
    return function collapse(row, index) {
        keys.forEach(function (propName) {
            row[propName] = (row[propName] && row[propName].split(sep)) || [];
        });
        row[collapsedName] = row[firstKey].map(function (id, index) {
            const element = {};
            keys.forEach(function (propName) {
                //const _propName = propName.replace(regex,'')
                element[propName] = row[propName][index];
            });
            return element;
        });
        keys.forEach(function (propName) { delete row[propName]; });
        return pubdate(row);
    };
}
exports.propertiesCollapser = propertiesCollapser;
exports.default = propertiesCollapser;
//# sourceMappingURL=propertiesCollapser.js.map