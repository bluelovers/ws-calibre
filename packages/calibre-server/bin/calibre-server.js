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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsaWJyZS1zZXJ2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYWxpYnJlLXNlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQSxrREFBMEI7QUFDMUIsK0JBQStCO0FBQy9CLDJEQUF5QztBQUV6QyxNQUFNLElBQUksR0FBRyxlQUFLO0tBQ2hCLE1BQU0sQ0FBQyxNQUFNLEVBQUU7SUFDZixLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUM7SUFDWixNQUFNLEVBQUUsSUFBSTtDQUNaLENBQUM7S0FDRCxNQUFNLENBQUMsWUFBWSxFQUFFO0lBQ3JCLFNBQVMsRUFBRSxJQUFJO0NBQ2YsQ0FBQztLQUNELE1BQU0sQ0FBQyxXQUFXLEVBQUU7SUFDcEIsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDO0lBQ2hCLE1BQU0sRUFBRSxJQUFJO0NBQ1osQ0FBQztLQUNELE1BQU0sQ0FBQyxjQUFjLEVBQUU7SUFDdkIsS0FBSyxFQUFFLElBQUk7SUFDWCxNQUFNLEVBQUUsSUFBSTtDQUNaLENBQUM7S0FDRCxNQUFNLENBQUMsS0FBSyxFQUFFO0lBQ2QsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDO0lBQ1osU0FBUyxFQUFFLElBQUk7Q0FDZixDQUFDO0tBQ0QsSUFBSSxFQUFFO0tBQ04sY0FBYyxDQUFDLElBQUksQ0FBQztLQUNwQixJQUFJLENBQ0w7QUFFRCxJQUFJLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFXLEVBQUUsR0FBRyxJQUFJLENBQUM7QUFFekMsSUFBSSxDQUFDLEdBQUcsRUFDUjtJQUNDLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7Q0FDcEI7QUFFRCxHQUFHLEdBQUcsY0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBRW5CLGdCQUFZLENBQUM7SUFDWixHQUFHLElBQUk7SUFDUCxHQUFHO0NBQ0gsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZVxuXG5pbXBvcnQgeWFyZ3MgZnJvbSAneWFyZ3MnO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IGNyZWF0ZVNlcnZlciBmcm9tICcuLi9saWIvc2VydmVyJztcblxuY29uc3QgYXJndiA9IHlhcmdzXG5cdC5vcHRpb24oJ3BvcnQnLCB7XG5cdFx0YWxpYXM6IFsncCddLFxuXHRcdG51bWJlcjogdHJ1ZSxcblx0fSlcblx0Lm9wdGlvbignc3RhdGljUGF0aCcsIHtcblx0XHRub3JtYWxpemU6IHRydWUsXG5cdH0pXG5cdC5vcHRpb24oJ3NpdGVUaXRsZScsIHtcblx0XHRhbGlhczogWyd0aXRsZSddLFxuXHRcdHN0cmluZzogdHJ1ZSxcblx0fSlcblx0Lm9wdGlvbignY2FsaWJyZVBhdGhzJywge1xuXHRcdGFycmF5OiB0cnVlLFxuXHRcdHN0cmluZzogdHJ1ZSxcblx0fSlcblx0Lm9wdGlvbignY3dkJywge1xuXHRcdGFsaWFzOiBbJ2MnXSxcblx0XHRub3JtYWxpemU6IHRydWUsXG5cdH0pXG5cdC5oZWxwKClcblx0LnNob3dIZWxwT25GYWlsKHRydWUpXG5cdC5hcmd2XG47XG5cbmxldCB7IGN3ZCA9IGFyZ3YuX1swXSBhcyBzdHJpbmcgfSA9IGFyZ3Y7XG5cbmlmICghY3dkKVxue1xuXHRjd2QgPSBwcm9jZXNzLmN3ZCgpO1xufVxuXG5jd2QgPSByZXNvbHZlKGN3ZCk7XG5cbmNyZWF0ZVNlcnZlcih7XG5cdC4uLmFyZ3YsXG5cdGN3ZCxcbn0pO1xuIl19