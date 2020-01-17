#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const __1 = __importDefault(require(".."));
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
    .argv;
__1.default(argv);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsaWJyZS1wcm94eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNhbGlicmUtcHJveHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUEsa0RBQTBCO0FBQzFCLDJDQUE4QjtBQUU5QixNQUFNLElBQUksR0FBRyxlQUFLO0tBQ2hCLE1BQU0sQ0FBQyxNQUFNLEVBQUU7SUFDZixLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUM7SUFDWixNQUFNLEVBQUUsSUFBSTtDQUNaLENBQUM7S0FDRCxNQUFNLENBQUMsWUFBWSxFQUFFO0lBQ3JCLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQztJQUNaLE1BQU0sRUFBRSxJQUFJO0NBQ1osQ0FBQztLQUNELE1BQU0sQ0FBQyxRQUFRLEVBQUU7SUFDakIsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDO0lBQ1osTUFBTSxFQUFFLElBQUk7Q0FDWixDQUFDO0tBQ0QsSUFBSSxFQUFFO0tBQ04sY0FBYyxDQUFDLElBQUksQ0FBQztLQUNwQixJQUFJLENBQ0w7QUFFRCxXQUFZLENBQUMsSUFBSSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5cbmltcG9ydCB5YXJncyBmcm9tICd5YXJncyc7XG5pbXBvcnQgY3JlYXRlU2VydmVyIGZyb20gJy4uJztcblxuY29uc3QgYXJndiA9IHlhcmdzXG5cdC5vcHRpb24oJ3BvcnQnLCB7XG5cdFx0YWxpYXM6IFsncCddLFxuXHRcdG51bWJlcjogdHJ1ZSxcblx0fSlcblx0Lm9wdGlvbigndGFyZ2V0UG9ydCcsIHtcblx0XHRhbGlhczogWyd0J10sXG5cdFx0bnVtYmVyOiB0cnVlLFxuXHR9KVxuXHQub3B0aW9uKCd0YXJnZXQnLCB7XG5cdFx0YWxpYXM6IFsnaCddLFxuXHRcdHN0cmluZzogdHJ1ZSxcblx0fSlcblx0LmhlbHAoKVxuXHQuc2hvd0hlbHBPbkZhaWwodHJ1ZSlcblx0LmFyZ3ZcbjtcblxuY3JlYXRlU2VydmVyKGFyZ3YpO1xuIl19