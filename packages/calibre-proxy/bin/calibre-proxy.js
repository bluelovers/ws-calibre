#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const yargs_1 = (0, tslib_1.__importDefault)(require("yargs"));
const __1 = (0, tslib_1.__importDefault)(require(".."));
const argv = yargs_1.default
    .option('port', {
    alias: ['p'],
    number: true,
})
    .option('targetPort', {
    alias: ['t'],
    number: true,
})
    .option('target', {
    alias: ['h'],
    string: true,
})
    .help()
    .showHelpOnFail(true)
    .parseSync();
(0, __1.default)(argv);
//# sourceMappingURL=calibre-proxy.js.map