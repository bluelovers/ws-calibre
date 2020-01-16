"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const bluebird_1 = require("@bluelovers/fast-glob/bluebird");
const array_hyper_unique_1 = require("array-hyper-unique");
function parseFavicon(favicon) {
    if (typeof favicon === 'string' || Buffer.isBuffer(favicon)) {
        return favicon;
    }
    else if (typeof favicon === 'object') {
        return Buffer.from(favicon.value, favicon.type);
    }
    else if (favicon) {
        throw new TypeError(`unknown favicon data type, ${favicon}`);
    }
    return null;
}
exports.parseFavicon = parseFavicon;
function defaultFavicon(staticPath, localStatic) {
    let ls = array_hyper_unique_1.array_unique([
        staticPath,
        localStatic,
    ]);
    for (let targetPath of ls) {
        let ret = bluebird_1.sync([
            `favicon.{png,ico,bmp}`,
        ], {
            cwd: staticPath,
            absolute: true,
        });
        if (ret.length) {
            return ret[0];
        }
    }
    return path_1.resolve(localStatic, `favicon.png`);
}
exports.defaultFavicon = defaultFavicon;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmF2aWNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZhdmljb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBK0I7QUFDL0IsNkRBQWtFO0FBQ2xFLDJEQUFrRDtBQUdsRCxTQUFnQixZQUFZLENBQUMsT0FBcUI7SUFFakQsSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFDM0Q7UUFDQyxPQUFPLE9BQU8sQ0FBQTtLQUNkO1NBQ0ksSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLEVBQ3BDO1FBQ0MsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0tBQy9DO1NBQ0ksSUFBSSxPQUFPLEVBQ2hCO1FBQ0MsTUFBTSxJQUFJLFNBQVMsQ0FBQyw4QkFBOEIsT0FBTyxFQUFFLENBQUMsQ0FBQTtLQUM1RDtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2IsQ0FBQztBQWhCRCxvQ0FnQkM7QUFFRCxTQUFnQixjQUFjLENBQUMsVUFBa0IsRUFBRSxXQUFtQjtJQUVyRSxJQUFJLEVBQUUsR0FBRyxpQ0FBWSxDQUFDO1FBQ3JCLFVBQVU7UUFDVixXQUFXO0tBQ1gsQ0FBQyxDQUFDO0lBRUgsS0FBSyxJQUFJLFVBQVUsSUFBSSxFQUFFLEVBQ3pCO1FBQ0MsSUFBSSxHQUFHLEdBQUcsZUFBUSxDQUFDO1lBQ2xCLHVCQUF1QjtTQUN2QixFQUFFO1lBQ0YsR0FBRyxFQUFFLFVBQVU7WUFDZixRQUFRLEVBQUUsSUFBSTtTQUNkLENBQUMsQ0FBQztRQUVILElBQUksR0FBRyxDQUFDLE1BQU0sRUFDZDtZQUNDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2Q7S0FDRDtJQUVELE9BQU8sY0FBTyxDQUFDLFdBQVcsRUFBRSxhQUFhLENBQUMsQ0FBQTtBQUMzQyxDQUFDO0FBdkJELHdDQXVCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgc3luYyBhcyBGYXN0R2xvYiB9IGZyb20gJ0BibHVlbG92ZXJzL2Zhc3QtZ2xvYi9ibHVlYmlyZCc7XG5pbXBvcnQgeyBhcnJheV91bmlxdWUgfSBmcm9tICdhcnJheS1oeXBlci11bmlxdWUnO1xuaW1wb3J0IHsgSUZhdmljb25EYXRhIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VGYXZpY29uKGZhdmljb246IElGYXZpY29uRGF0YSlcbntcblx0aWYgKHR5cGVvZiBmYXZpY29uID09PSAnc3RyaW5nJyB8fCBCdWZmZXIuaXNCdWZmZXIoZmF2aWNvbikpXG5cdHtcblx0XHRyZXR1cm4gZmF2aWNvblxuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBmYXZpY29uID09PSAnb2JqZWN0Jylcblx0e1xuXHRcdHJldHVybiBCdWZmZXIuZnJvbShmYXZpY29uLnZhbHVlLCBmYXZpY29uLnR5cGUpXG5cdH1cblx0ZWxzZSBpZiAoZmF2aWNvbilcblx0e1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYHVua25vd24gZmF2aWNvbiBkYXRhIHR5cGUsICR7ZmF2aWNvbn1gKVxuXHR9XG5cblx0cmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0RmF2aWNvbihzdGF0aWNQYXRoOiBzdHJpbmcsIGxvY2FsU3RhdGljOiBzdHJpbmcpOiBzdHJpbmdcbntcblx0bGV0IGxzID0gYXJyYXlfdW5pcXVlKFtcblx0XHRzdGF0aWNQYXRoLFxuXHRcdGxvY2FsU3RhdGljLFxuXHRdKTtcblxuXHRmb3IgKGxldCB0YXJnZXRQYXRoIG9mIGxzKVxuXHR7XG5cdFx0bGV0IHJldCA9IEZhc3RHbG9iKFtcblx0XHRcdGBmYXZpY29uLntwbmcsaWNvLGJtcH1gLFxuXHRcdF0sIHtcblx0XHRcdGN3ZDogc3RhdGljUGF0aCxcblx0XHRcdGFic29sdXRlOiB0cnVlLFxuXHRcdH0pO1xuXG5cdFx0aWYgKHJldC5sZW5ndGgpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIHJldFswXTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gcmVzb2x2ZShsb2NhbFN0YXRpYywgYGZhdmljb24ucG5nYClcbn1cbiJdfQ==