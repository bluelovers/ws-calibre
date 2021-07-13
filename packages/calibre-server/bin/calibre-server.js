#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const yargs_1 = (0, tslib_1.__importDefault)(require("yargs"));
const path_1 = require("path");
const server_1 = (0, tslib_1.__importDefault)(require("../lib/server"));
const options_1 = require("../lib/server/options");
const argv = yargs_1.default
    .option('port', {
    alias: ['p'],
    number: true,
    default: (0, options_1.defaultServerOptions)().port,
})
    .option('staticPath', {
    normalize: true,
})
    .option('siteTitle', {
    alias: ['title'],
    string: true,
})
    .option('calibrePaths', {
    array: true,
    string: true,
})
    .option('cwd', {
    alias: ['c'],
    normalize: true,
})
    .help()
    .showHelpOnFail(true)
    .parseSync();
let { cwd = argv._[0] } = argv;
if (!cwd) {
    cwd = process.cwd();
}
cwd = (0, path_1.resolve)(cwd);
(0, server_1.default)({
    ...argv,
    cwd,
});
//# sourceMappingURL=calibre-server.js.map