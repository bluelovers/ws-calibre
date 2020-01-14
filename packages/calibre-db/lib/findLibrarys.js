"use strict";
/**
 * Created by user on 2020/1/14.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bluebird_1 = __importDefault(require("@bluelovers/fast-glob/bluebird"));
const upath2_1 = require("upath2");
function findLibrarys(options) {
    const { cwd } = options;
    return bluebird_1.default([
        '*/metadata.db',
    ], {
        cwd,
    })
        .map(_path => {
        let _fullpath = upath2_1.join(cwd, _path);
        let name = upath2_1.dirname(_path);
        return {
            name,
            _path,
            _fullpath,
        };
    });
}
exports.findLibrarys = findLibrarys;
exports.default = findLibrarys;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZExpYnJhcnlzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmluZExpYnJhcnlzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7R0FFRzs7Ozs7QUFFSCw4RUFBc0Q7QUFDdEQsbUNBQThDO0FBRzlDLFNBQWdCLFlBQVksQ0FBQyxPQUU1QjtJQUVBLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxPQUFPLENBQUM7SUFFeEIsT0FBTyxrQkFBUSxDQUFDO1FBQ2YsZUFBZTtLQUNmLEVBQUU7UUFDRixHQUFHO0tBQ0gsQ0FBQztTQUNBLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNaLElBQUksU0FBUyxHQUFHLGFBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDakMsSUFBSSxJQUFJLEdBQUcsZ0JBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUxQixPQUFPO1lBQ04sSUFBSTtZQUNKLEtBQUs7WUFDTCxTQUFTO1NBQ1QsQ0FBQTtJQUNGLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQztBQXJCRCxvQ0FxQkM7QUFFRCxrQkFBZSxZQUFZLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgdXNlciBvbiAyMDIwLzEvMTQuXG4gKi9cblxuaW1wb3J0IEZhc3RHbG9iIGZyb20gJ0BibHVlbG92ZXJzL2Zhc3QtZ2xvYi9ibHVlYmlyZCc7XG5pbXBvcnQgeyBqb2luLCBkaXJuYW1lLCBwb3NpeCB9IGZyb20gXCJ1cGF0aDJcIjtcbmltcG9ydCBCbHVlYmlyZCBmcm9tICdibHVlYmlyZCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kTGlicmFyeXMob3B0aW9uczoge1xuXHRjd2Q6IHN0cmluZ1xufSlcbntcblx0Y29uc3QgeyBjd2QgfSA9IG9wdGlvbnM7XG5cblx0cmV0dXJuIEZhc3RHbG9iKFtcblx0XHQnKi9tZXRhZGF0YS5kYicsXG5cdF0sIHtcblx0XHRjd2QsXG5cdH0pXG5cdFx0Lm1hcChfcGF0aCA9PiB7XG5cdFx0XHRsZXQgX2Z1bGxwYXRoID0gam9pbihjd2QsIF9wYXRoKTtcblx0XHRcdGxldCBuYW1lID0gZGlybmFtZShfcGF0aCk7XG5cblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdG5hbWUsXG5cdFx0XHRcdF9wYXRoLFxuXHRcdFx0XHRfZnVsbHBhdGgsXG5cdFx0XHR9XG5cdFx0fSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgZmluZExpYnJhcnlzXG4iXX0=