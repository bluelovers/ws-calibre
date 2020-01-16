#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const path_1 = require("path");
const server_1 = __importDefault(require("../lib/server"));
const argv = yargs_1.default
    .option('port', {
    alias: ['p'],
    number: true,
    default: 2020,
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
    .argv;
let { cwd = argv._[0] } = argv;
if (!cwd) {
    cwd = process.cwd();
}
cwd = path_1.resolve(cwd);
server_1.default({
    ...argv,
    cwd,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsaWJyZS1zZXJ2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYWxpYnJlLXNlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQSxrREFBMEI7QUFDMUIsK0JBQStCO0FBQy9CLDJEQUF5QztBQUV6QyxNQUFNLElBQUksR0FBRyxlQUFLO0tBQ2hCLE1BQU0sQ0FBQyxNQUFNLEVBQUU7SUFDZixLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUM7SUFDWixNQUFNLEVBQUUsSUFBSTtJQUNaLE9BQU8sRUFBRSxJQUFJO0NBQ2IsQ0FBQztLQUNELE1BQU0sQ0FBQyxZQUFZLEVBQUU7SUFDckIsU0FBUyxFQUFFLElBQUk7Q0FDZixDQUFDO0tBQ0QsTUFBTSxDQUFDLFdBQVcsRUFBRTtJQUNwQixLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUM7SUFDaEIsTUFBTSxFQUFFLElBQUk7Q0FDWixDQUFDO0tBQ0QsTUFBTSxDQUFDLGNBQWMsRUFBRTtJQUN2QixLQUFLLEVBQUUsSUFBSTtJQUNYLE1BQU0sRUFBRSxJQUFJO0NBQ1osQ0FBQztLQUNELE1BQU0sQ0FBQyxLQUFLLEVBQUU7SUFDZCxLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUM7SUFDWixTQUFTLEVBQUUsSUFBSTtDQUNmLENBQUM7S0FDRCxJQUFJLEVBQUU7S0FDTixjQUFjLENBQUMsSUFBSSxDQUFDO0tBQ3BCLElBQUksQ0FDTDtBQUVELElBQUksRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQVcsRUFBRSxHQUFHLElBQUksQ0FBQztBQUV6QyxJQUFJLENBQUMsR0FBRyxFQUNSO0lBQ0MsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztDQUNwQjtBQUVELEdBQUcsR0FBRyxjQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7QUFFbkIsZ0JBQVksQ0FBQztJQUNaLEdBQUcsSUFBSTtJQUNQLEdBQUc7Q0FDSCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5cbmltcG9ydCB5YXJncyBmcm9tICd5YXJncyc7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgY3JlYXRlU2VydmVyIGZyb20gJy4uL2xpYi9zZXJ2ZXInO1xuXG5jb25zdCBhcmd2ID0geWFyZ3Ncblx0Lm9wdGlvbigncG9ydCcsIHtcblx0XHRhbGlhczogWydwJ10sXG5cdFx0bnVtYmVyOiB0cnVlLFxuXHRcdGRlZmF1bHQ6IDIwMjAsXG5cdH0pXG5cdC5vcHRpb24oJ3N0YXRpY1BhdGgnLCB7XG5cdFx0bm9ybWFsaXplOiB0cnVlLFxuXHR9KVxuXHQub3B0aW9uKCdzaXRlVGl0bGUnLCB7XG5cdFx0YWxpYXM6IFsndGl0bGUnXSxcblx0XHRzdHJpbmc6IHRydWUsXG5cdH0pXG5cdC5vcHRpb24oJ2NhbGlicmVQYXRocycsIHtcblx0XHRhcnJheTogdHJ1ZSxcblx0XHRzdHJpbmc6IHRydWUsXG5cdH0pXG5cdC5vcHRpb24oJ2N3ZCcsIHtcblx0XHRhbGlhczogWydjJ10sXG5cdFx0bm9ybWFsaXplOiB0cnVlLFxuXHR9KVxuXHQuaGVscCgpXG5cdC5zaG93SGVscE9uRmFpbCh0cnVlKVxuXHQuYXJndlxuO1xuXG5sZXQgeyBjd2QgPSBhcmd2Ll9bMF0gYXMgc3RyaW5nIH0gPSBhcmd2O1xuXG5pZiAoIWN3ZClcbntcblx0Y3dkID0gcHJvY2Vzcy5jd2QoKTtcbn1cblxuY3dkID0gcmVzb2x2ZShjd2QpO1xuXG5jcmVhdGVTZXJ2ZXIoe1xuXHQuLi5hcmd2LFxuXHRjd2QsXG59KTtcbiJdfQ==