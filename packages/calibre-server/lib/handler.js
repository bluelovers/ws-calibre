"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const log_1 = require("./log");
const index_1 = (0, tslib_1.__importDefault)(require("./opds/index"));
const db_1 = (0, tslib_1.__importDefault)(require("./opds/db"));
function createHandler(options) {
    const { dbList } = options;
    const router = (0, express_1.Router)();
    log_1.console.dir(dbList);
    router.use('/+:dbID', async (req, res, next) => {
        let { dbID } = req.params;
        if (dbID && dbList[dbID]) {
            log_1.console.dir({
                dbID,
                name: dbList[dbID].name,
            });
            res.setHeader('Content-Type', 'application/xml');
            let feed = await (0, db_1.default)(options, { dbID });
            res.send(feed.toXML());
        }
        else {
            if (dbID) {
                log_1.console.error(`dbID: ${dbID} 不存在`);
            }
            return next();
        }
    });
    let opdsIndex = (req, res, next) => {
        res.setHeader('Content-Type', 'application/xml');
        res.send((0, index_1.default)(options).toXML());
    };
    router.use('/opds(\.xml)?', opdsIndex);
    router.use('/', opdsIndex);
    router.use('*', (req, res, next) => {
        return next();
    });
    return router;
}
exports.default = createHandler;
//# sourceMappingURL=handler.js.map