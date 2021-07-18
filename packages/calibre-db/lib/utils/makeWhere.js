"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeWhere = void 0;
function makeWhere(tableName, locator, columnName = 'name', sep = '.') {
    const getAll = (locator == null || locator === '*' || locator === '' || locator === '/');
    const isNumber = /\d+/.test(locator + '');
    const isString = !isNumber;
    const whereStatement = getAll ?
        `${tableName}${sep}id LIKE ?` :
        isString ?
            `${tableName}${sep}${columnName} COLLATE UTF8_GENERAL_CI LIKE ?` :
            `${tableName}${sep}id = ?`;
    const value = getAll ? '%' : isString ? `%${locator}%` : locator;
    return [whereStatement, value];
}
exports.makeWhere = makeWhere;
exports.default = makeWhere;
//# sourceMappingURL=makeWhere.js.map