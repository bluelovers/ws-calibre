"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const serve_favicon_1 = __importDefault(require("serve-favicon"));
const bluebird_1 = __importDefault(require("bluebird"));
const array_hyper_unique_1 = require("array-hyper-unique");
const findLibrarys_1 = __importDefault(require("calibre-db/lib/findLibrarys"));
const upath2_1 = require("upath2");
const crypto_1 = require("./crypto");
const loadLibrary_1 = __importDefault(require("calibre-db/lib/loadLibrary"));
const handler_1 = __importDefault(require("./handler"));
const log_1 = require("./log");
const helmet_1 = __importDefault(require("helmet"));
const static_1 = __importDefault(require("./static"));
const package_json_1 = require("../package.json");
const favicon_1 = require("./server/favicon");
async function createServer(options) {
    let { cwd, port = 3000, calibrePaths, pathPrefix = '', dbFilter, siteTitle = `Calibre 書庫 by ${package_json_1.name}@${package_json_1.version}` } = options;
    cwd = upath2_1.resolve(cwd);
    if (calibrePaths == null) {
        calibrePaths = [cwd];
    }
    const pathWithPrefix = (a = '', ...input) => [pathPrefix, a, ...input].join('/');
    log_1.console.info(`處理伺服器設定中`);
    const app = express_1.default();
    app.use(helmet_1.default());
    let localStatic = upath2_1.resolve(__dirname, '..', 'static');
    let staticPath = upath2_1.resolve(options.staticPath || localStatic);
    app.set('trust proxy', 1);
    app.use(serve_favicon_1.default(favicon_1.parseFavicon(options.favicon) || favicon_1.defaultFavicon(staticPath, localStatic)));
    app.use('/static', express_1.default.static(staticPath));
    let dbList = await bluebird_1.default
        .resolve(array_hyper_unique_1.array_unique(calibrePaths).map(v => upath2_1.resolve(cwd, v)))
        .reduce(async (list, cwd) => {
        let lp = findLibrarys_1.default({
            cwd,
        });
        if (dbFilter) {
            lp = lp.filter(dbFilter);
        }
        await lp.tap(ls => list.push(...ls));
        return list;
    }, [])
        .reduce(async (a, row) => {
        let id = crypto_1.hash_sha1(row._fullpath);
        let p = pathWithPrefix(id);
        app.use(`${p}`, static_1.default(row._fulldir, {
            extensions: ["epub" /* EPUB */],
            index: false,
        }));
        log_1.console.debug(`[static]`, p, `=>`, row._fulldir);
        a[id] = {
            ...row,
            id,
            db: null,
            lazyload() {
                a[id].lazyload = () => bluebird_1.default.resolve(a[id].db);
                return loadLibrary_1.default(row)
                    .tap(db => {
                    a[id].db = db;
                });
            },
        };
        return a;
    }, {});
    if (!Object.keys(dbList).length) {
        let err = `無法在目標路徑內找到任何 Calibre metadata.db 資料庫`;
        log_1.console.error(err);
        return bluebird_1.default.reject(new Error(err));
    }
    app.use((req, res, next) => {
        log_1.console.debug(...log_1.logRequest(req, res));
        return next();
    });
    let sharedOptions = {
        app,
        port,
        pathWithPrefix,
        dbList,
        siteTitle,
    };
    app.use(handler_1.default(sharedOptions));
    let _app = app.listen(port, function () {
        let address = _app.address();
        log_1.console.success(`listening on http://127.0.0.1:${address.port}${pathWithPrefix()}`);
    });
    return _app;
}
exports.createServer = createServer;
exports.default = createServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQThEO0FBQzlELGtFQUFvQztBQUVwQyx3REFBZ0M7QUFHaEMsMkRBQWtEO0FBQ2xELCtFQUF1RDtBQUN2RCxtQ0FBaUM7QUFDakMscUNBQXFDO0FBQ3JDLDZFQUFxRDtBQUdyRCx3REFBc0M7QUFDdEMsK0JBQTBEO0FBRTFELG9EQUE0QjtBQUM1QixzREFBbUM7QUFDbkMsa0RBQXlFO0FBQ3pFLDhDQUFnRTtBQUV6RCxLQUFLLFVBQVUsWUFBWSxDQUFDLE9BYWxDO0lBRUEsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEdBQUcsSUFBSSxFQUFFLFlBQVksRUFBRSxVQUFVLEdBQUcsRUFBRSxFQUFFLFFBQVEsRUFBRSxTQUFTLEdBQUcsaUJBQWlCLG1CQUFPLElBQUksc0JBQVUsRUFBRSxFQUFFLEdBQUcsT0FBTyxDQUFDO0lBRWxJLEdBQUcsR0FBRyxnQkFBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRW5CLElBQUksWUFBWSxJQUFJLElBQUksRUFDeEI7UUFDQyxZQUFZLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNyQjtJQUVELE1BQU0sY0FBYyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxHQUFHLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWpGLGFBQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFekIsTUFBTSxHQUFHLEdBQUcsaUJBQU8sRUFBRSxDQUFDO0lBRXRCLEdBQUcsQ0FBQyxHQUFHLENBQUMsZ0JBQU0sRUFBRSxDQUFDLENBQUM7SUFDbEIsSUFBSSxXQUFXLEdBQUcsZ0JBQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxD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QUFHLENBQUMsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtRQUMzRCxhQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsZ0JBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN2QyxPQUFPLElBQUksRUFBRSxDQUFDO0lBQ2YsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLGFBQWEsR0FBMEI7UUFDMUMsR0FBRztRQUNILElBQUk7UUFDSixjQUFjO1FBQ2QsTUFBTTtRQUNOLFNBQVM7S0FDVCxDQUFDO0lBRUYsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFFdEMsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7UUFFM0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFJekIsQ0FBQztRQUVGLGFBQU8sQ0FBQyxPQUFPLENBQUMsaUNBQWlDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3JGLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUE7QUFDWixDQUFDO0FBOUhELG9DQThIQztBQUVELGtCQUFlLFlBQVksQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzLCB7IEV4cHJlc3MsIFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgZmF2aWNvbiBmcm9tICdzZXJ2ZS1mYXZpY29uJztcbmltcG9ydCBtb21lbnQgZnJvbSAnLi9tb21lbnQnO1xuaW1wb3J0IEJsdWViaXJkIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCB7IElGaW5kTGlicmFyeXMsIEVudW1EYXRhRm9ybWF0TG93ZXJDYXNlIH0gZnJvbSAnY2FsaWJyZS1kYic7XG5pbXBvcnQgeyBJVFNSZXNvbHZhYmxlIH0gZnJvbSAndHMtdHlwZSc7XG5pbXBvcnQgeyBhcnJheV91bmlxdWUgfSBmcm9tICdhcnJheS1oeXBlci11bmlxdWUnO1xuaW1wb3J0IGZpbmRMaWJyYXJ5cyBmcm9tICdjYWxpYnJlLWRiL2xpYi9maW5kTGlicmFyeXMnO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJ1cGF0aDJcIjtcbmltcG9ydCB7IGhhc2hfc2hhMSB9IGZyb20gJy4vY3J5cHRvJztcbmltcG9ydCBsb2FkTGlicmFyeSBmcm9tICdjYWxpYnJlLWRiL2xpYi9sb2FkTGlicmFyeSc7XG5pbXBvcnQgeyBEQiB9IGZyb20gJ2NhbGlicmUtZGIvbGliL0RCJztcbmltcG9ydCB7IElGaW5kTGlicmFyeXNTZXJ2ZXIsIElGYXZpY29uRGF0YSwgSVNoYXJlZEhhbmRsZXJPcHRpb25zIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgY3JlYXRlSGFuZGxlciBmcm9tICcuL2hhbmRsZXInO1xuaW1wb3J0IHsgY29uc29sZSwgY29uc29sZURlYnVnLCBsb2dSZXF1ZXN0IH0gZnJvbSAnLi9sb2cnO1xuaW1wb3J0IHsgTmV4dEZ1bmN0aW9uIH0gZnJvbSAnZXhwcmVzcy1zZXJ2ZS1zdGF0aWMtY29yZSc7XG5pbXBvcnQgaGVsbWV0IGZyb20gJ2hlbG1ldCc7XG5pbXBvcnQgc3RhdGljRXh0cmEgZnJvbSAnLi9zdGF0aWMnO1xuaW1wb3J0IHsgbmFtZSBhcyBwa2dOYW1lLCB2ZXJzaW9uIGFzIHBrZ1ZlcnNpb24gfSBmcm9tICcuLi9wYWNrYWdlLmpzb24nO1xuaW1wb3J0IHsgcGFyc2VGYXZpY29uLCBkZWZhdWx0RmF2aWNvbiB9IGZyb20gJy4vc2VydmVyL2Zhdmljb24nO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlU2VydmVyKG9wdGlvbnM6IHtcblx0Y3dkOiBzdHJpbmcsXG5cdHBvcnQ/OiBudW1iZXIsXG5cdHBhdGhQcmVmaXg/OiBzdHJpbmcsXG5cdGNhbGlicmVQYXRocz86IHN0cmluZ1tdLFxuXHRkYkZpbHRlcj8ocm93OiB7XG5cdFx0bmFtZSxcblx0XHRfcGF0aCxcblx0XHRfZnVsbHBhdGgsXG5cdH0pOiBJVFNSZXNvbHZhYmxlPGJvb2xlYW4+LFxuXHRzaXRlVGl0bGU/OiBzdHJpbmcsXG5cdGZhdmljb24/OiBJRmF2aWNvbkRhdGEsXG5cdHN0YXRpY1BhdGg/OiBzdHJpbmcsXG59KVxue1xuXHRsZXQgeyBjd2QsIHBvcnQgPSAzMDAwLCBjYWxpYnJlUGF0aHMsIHBhdGhQcmVmaXggPSAnJywgZGJGaWx0ZXIsIHNpdGVUaXRsZSA9IGBDYWxpYnJlIOabuOW6qyBieSAke3BrZ05hbWV9QCR7cGtnVmVyc2lvbn1gIH0gPSBvcHRpb25zO1xuXG5cdGN3ZCA9IHJlc29sdmUoY3dkKTtcblxuXHRpZiAoY2FsaWJyZVBhdGhzID09IG51bGwpXG5cdHtcblx0XHRjYWxpYnJlUGF0aHMgPSBbY3dkXTtcblx0fVxuXG5cdGNvbnN0IHBhdGhXaXRoUHJlZml4ID0gKGEgPSAnJywgLi4uaW5wdXQpID0+IFtwYXRoUHJlZml4LCBhLCAuLi5pbnB1dF0uam9pbignLycpO1xuXG5cdGNvbnNvbGUuaW5mbyhg6JmV55CG5Ly65pyN5Zmo6Kit5a6a5LitYCk7XG5cblx0Y29uc3QgYXBwID0gZXhwcmVzcygpO1xuXG5cdGFwcC51c2UoaGVsbWV0KCkpO1xuXHRsZXQgbG9jYWxTdGF0aWMgPSByZXNvbHZlKF9fZGlybmFtZSwgJy4uJywgJ3N0YXRpYycpO1xuXG5cdGxldCBzdGF0aWNQYXRoID0gcmVzb2x2ZShvcHRpb25zLnN0YXRpY1BhdGggfHwgbG9jYWxTdGF0aWMpO1xuXG5cdGFwcC5zZXQoJ3RydXN0IHByb3h5JywgMSk7XG5cblx0YXBwLnVzZShmYXZpY29uKHBhcnNlRmF2aWNvbihvcHRpb25zLmZhdmljb24pIHx8IGRlZmF1bHRGYXZpY29uKHN0YXRpY1BhdGgsIGxvY2FsU3RhdGljKSkpO1xuXHRhcHAudXNlKCcvc3RhdGljJywgZXhwcmVzcy5zdGF0aWMoc3RhdGljUGF0aCkpO1xuXG5cdGxldCBkYkxpc3QgPSBhd2FpdCBCbHVlYmlyZFxuXHRcdC5yZXNvbHZlKGFycmF5X3VuaXF1ZShjYWxpYnJlUGF0aHMpLm1hcCh2ID0+IHJlc29sdmUoY3dkLCB2KSkpXG5cdFx0LnJlZHVjZShhc3luYyAobGlzdCwgY3dkKSA9PlxuXHRcdHtcblxuXHRcdFx0bGV0IGxwID0gZmluZExpYnJhcnlzKHtcblx0XHRcdFx0Y3dkLFxuXHRcdFx0fSk7XG5cblx0XHRcdGlmIChkYkZpbHRlcilcblx0XHRcdHtcblx0XHRcdFx0bHAgPSBscC5maWx0ZXIoZGJGaWx0ZXIpXG5cdFx0XHR9XG5cblx0XHRcdGF3YWl0IGxwLnRhcChscyA9PiBsaXN0LnB1c2goLi4ubHMpKTtcblxuXHRcdFx0cmV0dXJuIGxpc3Rcblx0XHR9LCBbXSBhcyBJRmluZExpYnJhcnlzW10pXG5cdFx0LnJlZHVjZShhc3luYyAoYSwgcm93KSA9PlxuXHRcdHtcblxuXHRcdFx0bGV0IGlkID0gaGFzaF9zaGExKHJvdy5fZnVsbHBhdGgpO1xuXG5cdFx0XHRsZXQgcCA9IHBhdGhXaXRoUHJlZml4KGlkKTtcblxuXHRcdFx0YXBwLnVzZShgJHtwfWAsIHN0YXRpY0V4dHJhKHJvdy5fZnVsbGRpciwge1xuXHRcdFx0XHRleHRlbnNpb25zOiBbRW51bURhdGFGb3JtYXRMb3dlckNhc2UuRVBVQl0sXG5cdFx0XHRcdGluZGV4OiBmYWxzZSxcblx0XHRcdH0pKTtcblx0XHRcdGNvbnNvbGUuZGVidWcoYFtzdGF0aWNdYCwgcCwgYD0+YCwgcm93Ll9mdWxsZGlyKTtcblxuXHRcdFx0YVtpZF0gPSB7XG5cdFx0XHRcdC4uLnJvdyxcblx0XHRcdFx0aWQsXG5cdFx0XHRcdGRiOiBudWxsLFxuXHRcdFx0XHRsYXp5bG9hZCgpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRhW2lkXS5sYXp5bG9hZCA9ICgpID0+IEJsdWViaXJkLnJlc29sdmUoYVtpZF0uZGIpO1xuXG5cdFx0XHRcdFx0cmV0dXJuIGxvYWRMaWJyYXJ5KHJvdylcblx0XHRcdFx0XHRcdC50YXAoZGIgPT5cblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0YVtpZF0uZGIgPSBkYjtcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHQ7XG5cdFx0XHRcdH0sXG5cdFx0XHR9O1xuXG5cdFx0XHRyZXR1cm4gYTtcblx0XHR9LCB7fSBhcyBSZWNvcmQ8c3RyaW5nLCBJRmluZExpYnJhcnlzU2VydmVyPilcblx0O1xuXG5cdGlmICghT2JqZWN0LmtleXMoZGJMaXN0KS5sZW5ndGgpXG5cdHtcblx0XHRsZXQgZXJyID0gYOeEoeazleWcqOebruaomei3r+W+keWFp+aJvuWIsOS7u+S9lSBDYWxpYnJlIG1ldGFkYXRhLmRiIOizh+aWmeW6q2A7XG5cdFx0Y29uc29sZS5lcnJvcihlcnIpO1xuXHRcdHJldHVybiBCbHVlYmlyZC5yZWplY3QobmV3IEVycm9yKGVycikpO1xuXHR9XG5cblx0YXBwLnVzZSgocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcblx0XHRjb25zb2xlLmRlYnVnKC4uLmxvZ1JlcXVlc3QocmVxLCByZXMpKTtcblx0XHRyZXR1cm4gbmV4dCgpO1xuXHR9KTtcblxuXHRsZXQgc2hhcmVkT3B0aW9uczogSVNoYXJlZEhhbmRsZXJPcHRpb25zID0ge1xuXHRcdGFwcCxcblx0XHRwb3J0LFxuXHRcdHBhdGhXaXRoUHJlZml4LFxuXHRcdGRiTGlzdCxcblx0XHRzaXRlVGl0bGUsXG5cdH07XG5cblx0YXBwLnVzZShjcmVhdGVIYW5kbGVyKHNoYXJlZE9wdGlvbnMpKTtcblxuXHRsZXQgX2FwcCA9IGFwcC5saXN0ZW4ocG9ydCwgZnVuY3Rpb24gKClcblx0e1xuXHRcdGxldCBhZGRyZXNzID0gX2FwcC5hZGRyZXNzKCkgYXMge1xuXHRcdFx0YWRkcmVzczogc3RyaW5nLFxuXHRcdFx0ZmFtaWx5OiBzdHJpbmcgfCAnSVB2NicsXG5cdFx0XHRwb3J0OiBudW1iZXIsXG5cdFx0fTtcblxuXHRcdGNvbnNvbGUuc3VjY2VzcyhgbGlzdGVuaW5nIG9uIGh0dHA6Ly8xMjcuMC4wLjE6JHthZGRyZXNzLnBvcnR9JHtwYXRoV2l0aFByZWZpeCgpfWApO1xuXHR9KTtcblxuXHRyZXR1cm4gX2FwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVTZXJ2ZXJcbiJdfQ==