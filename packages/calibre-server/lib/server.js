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
const qrcode_terminal_1 = require("qrcode-terminal");
const ip_1 = require("./ip");
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
        let ip = ip_1.searchIPAddress();
        let href = `http://${ip}:${address.port}${pathWithPrefix()}`;
        qrcode_terminal_1.generate(href, { small: true });
        log_1.console.success(`伺服器成功啟動`);
        log_1.console.success(href);
        if (ip !== '127.0.0.1') {
            let ip = '127.0.0.1';
            href = `http://${ip}:${address.port}${pathWithPrefix()}`;
            log_1.console.success(href);
        }
    });
    return _app;
}
exports.createServer = createServer;
exports.default = createServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQThEO0FBQzlELGtFQUFvQztBQUVwQyx3REFBZ0M7QUFHaEMsMkRBQWtEO0FBQ2xELCtFQUF1RDtBQUN2RCxtQ0FBaUM7QUFDakMscUNBQXFDO0FBQ3JDLDZFQUFxRDtBQUdyRCx3REFBc0M7QUFDdEMsK0JBQTBEO0FBRTFELG9EQUE0QjtBQUM1QixzREFBbUM7QUFDbkMsa0RBQXlFO0FBQ3pFLDhDQUFnRTtBQUVoRSxxREFBcUQ7QUFDckQsNkJBQXVDO0FBRWhDLEtBQUssVUFBVSxZQUFZLENBQUMsT0FhbEM7SUFFQSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksR0FBRyxJQUFJLEVBQUUsWUFBWSxFQUFFLFVBQVUsR0FBRyxFQUFFLEVBQUUsUUFBUSxFQUFFLFNBQVMsR0FBRyxpQkFBaUIsbUJBQU8sSUFBSSxzQkFBVSxFQUFFLEVBQUUsR0FBRyxPQUFPLENBQUM7SUFFbEksR0FBRyxHQUFHLGdCQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFbkIsSUFBSSxZQUFZLElBQUksSUFBSSxFQUN4QjtRQUNDLFlBQVksR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3JCO0lBRUQsTUFBTSxjQUFjLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLEdBQUcsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFakYsYUFBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUV6QixNQUFNLEdBQUcsR0FBRyxpQkFBTyxFQUFFLENBQUM7SUFFdEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxnQkFBTSxFQUFFLENBQUMsQ0FBQztJQUNsQixJQUFJLFdBQVcsR0FBRyxnQkFBTyxDQUFDLFNBQVMs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LENBQUE7QUFDWixDQUFDO0FBOUlELG9DQThJQztBQUVELGtCQUFlLFlBQVksQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzLCB7IEV4cHJlc3MsIFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgZmF2aWNvbiBmcm9tICdzZXJ2ZS1mYXZpY29uJztcbmltcG9ydCBtb21lbnQgZnJvbSAnLi9tb21lbnQnO1xuaW1wb3J0IEJsdWViaXJkIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCB7IElGaW5kTGlicmFyeXMsIEVudW1EYXRhRm9ybWF0TG93ZXJDYXNlIH0gZnJvbSAnY2FsaWJyZS1kYic7XG5pbXBvcnQgeyBJVFNSZXNvbHZhYmxlIH0gZnJvbSAndHMtdHlwZSc7XG5pbXBvcnQgeyBhcnJheV91bmlxdWUgfSBmcm9tICdhcnJheS1oeXBlci11bmlxdWUnO1xuaW1wb3J0IGZpbmRMaWJyYXJ5cyBmcm9tICdjYWxpYnJlLWRiL2xpYi9maW5kTGlicmFyeXMnO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJ1cGF0aDJcIjtcbmltcG9ydCB7IGhhc2hfc2hhMSB9IGZyb20gJy4vY3J5cHRvJztcbmltcG9ydCBsb2FkTGlicmFyeSBmcm9tICdjYWxpYnJlLWRiL2xpYi9sb2FkTGlicmFyeSc7XG5pbXBvcnQgeyBEQiB9IGZyb20gJ2NhbGlicmUtZGIvbGliL0RCJztcbmltcG9ydCB7IElGaW5kTGlicmFyeXNTZXJ2ZXIsIElGYXZpY29uRGF0YSwgSVNoYXJlZEhhbmRsZXJPcHRpb25zIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgY3JlYXRlSGFuZGxlciBmcm9tICcuL2hhbmRsZXInO1xuaW1wb3J0IHsgY29uc29sZSwgY29uc29sZURlYnVnLCBsb2dSZXF1ZXN0IH0gZnJvbSAnLi9sb2cnO1xuaW1wb3J0IHsgTmV4dEZ1bmN0aW9uIH0gZnJvbSAnZXhwcmVzcy1zZXJ2ZS1zdGF0aWMtY29yZSc7XG5pbXBvcnQgaGVsbWV0IGZyb20gJ2hlbG1ldCc7XG5pbXBvcnQgc3RhdGljRXh0cmEgZnJvbSAnLi9zdGF0aWMnO1xuaW1wb3J0IHsgbmFtZSBhcyBwa2dOYW1lLCB2ZXJzaW9uIGFzIHBrZ1ZlcnNpb24gfSBmcm9tICcuLi9wYWNrYWdlLmpzb24nO1xuaW1wb3J0IHsgcGFyc2VGYXZpY29uLCBkZWZhdWx0RmF2aWNvbiB9IGZyb20gJy4vc2VydmVyL2Zhdmljb24nO1xuaW1wb3J0IHsgaXAgYXMgSVBBZGRyZXNzIH0gZnJvbSAnYWRkcmVzcyc7XG5pbXBvcnQgeyBnZW5lcmF0ZSBhcyBxcmNvZGUgfSBmcm9tICdxcmNvZGUtdGVybWluYWwnO1xuaW1wb3J0IHsgc2VhcmNoSVBBZGRyZXNzIH0gZnJvbSAnLi9pcCc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVTZXJ2ZXIob3B0aW9uczoge1xuXHRjd2Q6IHN0cmluZyxcblx0cG9ydD86IG51bWJlcixcblx0cGF0aFByZWZpeD86IHN0cmluZyxcblx0Y2FsaWJyZVBhdGhzPzogc3RyaW5nW10sXG5cdGRiRmlsdGVyPyhyb3c6IHtcblx0XHRuYW1lLFxuXHRcdF9wYXRoLFxuXHRcdF9mdWxscGF0aCxcblx0fSk6IElUU1Jlc29sdmFibGU8Ym9vbGVhbj4sXG5cdHNpdGVUaXRsZT86IHN0cmluZyxcblx0ZmF2aWNvbj86IElGYXZpY29uRGF0YSxcblx0c3RhdGljUGF0aD86IHN0cmluZyxcbn0pXG57XG5cdGxldCB7IGN3ZCwgcG9ydCA9IDMwMDAsIGNhbGlicmVQYXRocywgcGF0aFByZWZpeCA9ICcnLCBkYkZpbHRlciwgc2l0ZVRpdGxlID0gYENhbGlicmUg5pu45bqrIGJ5ICR7cGtnTmFtZX1AJHtwa2dWZXJzaW9ufWAgfSA9IG9wdGlvbnM7XG5cblx0Y3dkID0gcmVzb2x2ZShjd2QpO1xuXG5cdGlmIChjYWxpYnJlUGF0aHMgPT0gbnVsbClcblx0e1xuXHRcdGNhbGlicmVQYXRocyA9IFtjd2RdO1xuXHR9XG5cblx0Y29uc3QgcGF0aFdpdGhQcmVmaXggPSAoYSA9ICcnLCAuLi5pbnB1dCkgPT4gW3BhdGhQcmVmaXgsIGEsIC4uLmlucHV0XS5qb2luKCcvJyk7XG5cblx0Y29uc29sZS5pbmZvKGDomZXnkIbkvLrmnI3lmajoqK3lrprkuK1gKTtcblxuXHRjb25zdCBhcHAgPSBleHByZXNzKCk7XG5cblx0YXBwLnVzZShoZWxtZXQoKSk7XG5cdGxldCBsb2NhbFN0YXRpYyA9IHJlc29sdmUoX19kaXJuYW1lLCAnLi4nLCAnc3RhdGljJyk7XG5cblx0bGV0IHN0YXRpY1BhdGggPSByZXNvbHZlKG9wdGlvbnMuc3RhdGljUGF0aCB8fCBsb2NhbFN0YXRpYyk7XG5cblx0YXBwLnNldCgndHJ1c3QgcHJveHknLCAxKTtcblxuXHRhcHAudXNlKGZhdmljb24ocGFyc2VGYXZpY29uKG9wdGlvbnMuZmF2aWNvbikgfHwgZGVmYXVsdEZhdmljb24oc3RhdGljUGF0aCwgbG9jYWxTdGF0aWMpKSk7XG5cdGFwcC51c2UoJy9zdGF0aWMnLCBleHByZXNzLnN0YXRpYyhzdGF0aWNQYXRoKSk7XG5cblx0bGV0IGRiTGlzdCA9IGF3YWl0IEJsdWViaXJkXG5cdFx0LnJlc29sdmUoYXJyYXlfdW5pcXVlKGNhbGlicmVQYXRocykubWFwKHYgPT4gcmVzb2x2ZShjd2QsIHYpKSlcblx0XHQucmVkdWNlKGFzeW5jIChsaXN0LCBjd2QpID0+XG5cdFx0e1xuXG5cdFx0XHRsZXQgbHAgPSBmaW5kTGlicmFyeXMoe1xuXHRcdFx0XHRjd2QsXG5cdFx0XHR9KTtcblxuXHRcdFx0aWYgKGRiRmlsdGVyKVxuXHRcdFx0e1xuXHRcdFx0XHRscCA9IGxwLmZpbHRlcihkYkZpbHRlcilcblx0XHRcdH1cblxuXHRcdFx0YXdhaXQgbHAudGFwKGxzID0+IGxpc3QucHVzaCguLi5scykpO1xuXG5cdFx0XHRyZXR1cm4gbGlzdFxuXHRcdH0sIFtdIGFzIElGaW5kTGlicmFyeXNbXSlcblx0XHQucmVkdWNlKGFzeW5jIChhLCByb3cpID0+XG5cdFx0e1xuXG5cdFx0XHRsZXQgaWQgPSBoYXNoX3NoYTEocm93Ll9mdWxscGF0aCk7XG5cblx0XHRcdGxldCBwID0gcGF0aFdpdGhQcmVmaXgoaWQpO1xuXG5cdFx0XHRhcHAudXNlKGAke3B9YCwgc3RhdGljRXh0cmEocm93Ll9mdWxsZGlyLCB7XG5cdFx0XHRcdGV4dGVuc2lvbnM6IFtFbnVtRGF0YUZvcm1hdExvd2VyQ2FzZS5FUFVCXSxcblx0XHRcdFx0aW5kZXg6IGZhbHNlLFxuXHRcdFx0fSkpO1xuXHRcdFx0Y29uc29sZS5kZWJ1ZyhgW3N0YXRpY11gLCBwLCBgPT5gLCByb3cuX2Z1bGxkaXIpO1xuXG5cdFx0XHRhW2lkXSA9IHtcblx0XHRcdFx0Li4ucm93LFxuXHRcdFx0XHRpZCxcblx0XHRcdFx0ZGI6IG51bGwsXG5cdFx0XHRcdGxhenlsb2FkKClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGFbaWRdLmxhenlsb2FkID0gKCkgPT4gQmx1ZWJpcmQucmVzb2x2ZShhW2lkXS5kYik7XG5cblx0XHRcdFx0XHRyZXR1cm4gbG9hZExpYnJhcnkocm93KVxuXHRcdFx0XHRcdFx0LnRhcChkYiA9PlxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRhW2lkXS5kYiA9IGRiO1xuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdDtcblx0XHRcdFx0fSxcblx0XHRcdH07XG5cblx0XHRcdHJldHVybiBhO1xuXHRcdH0sIHt9IGFzIFJlY29yZDxzdHJpbmcsIElGaW5kTGlicmFyeXNTZXJ2ZXI+KVxuXHQ7XG5cblx0aWYgKCFPYmplY3Qua2V5cyhkYkxpc3QpLmxlbmd0aClcblx0e1xuXHRcdGxldCBlcnIgPSBg54Sh5rOV5Zyo55uu5qiZ6Lev5b6R5YWn5om+5Yiw5Lu75L2VIENhbGlicmUgbWV0YWRhdGEuZGIg6LOH5paZ5bqrYDtcblx0XHRjb25zb2xlLmVycm9yKGVycik7XG5cdFx0cmV0dXJuIEJsdWViaXJkLnJlamVjdChuZXcgRXJyb3IoZXJyKSk7XG5cdH1cblxuXHRhcHAudXNlKChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikgPT5cblx0e1xuXHRcdGNvbnNvbGUuZGVidWcoLi4ubG9nUmVxdWVzdChyZXEsIHJlcykpO1xuXHRcdHJldHVybiBuZXh0KCk7XG5cdH0pO1xuXG5cdGxldCBzaGFyZWRPcHRpb25zOiBJU2hhcmVkSGFuZGxlck9wdGlvbnMgPSB7XG5cdFx0YXBwLFxuXHRcdHBvcnQsXG5cdFx0cGF0aFdpdGhQcmVmaXgsXG5cdFx0ZGJMaXN0LFxuXHRcdHNpdGVUaXRsZSxcblx0fTtcblxuXHRhcHAudXNlKGNyZWF0ZUhhbmRsZXIoc2hhcmVkT3B0aW9ucykpO1xuXG5cdGxldCBfYXBwID0gYXBwLmxpc3Rlbihwb3J0LCBmdW5jdGlvbiAoKVxuXHR7XG5cdFx0bGV0IGFkZHJlc3MgPSBfYXBwLmFkZHJlc3MoKSBhcyB7XG5cdFx0XHRhZGRyZXNzOiBzdHJpbmcsXG5cdFx0XHRmYW1pbHk6IHN0cmluZyB8ICdJUHY2Jyxcblx0XHRcdHBvcnQ6IG51bWJlcixcblx0XHR9O1xuXG5cdFx0bGV0IGlwOiBzdHJpbmcgPSBzZWFyY2hJUEFkZHJlc3MoKTtcblxuXHRcdGxldCBocmVmID0gYGh0dHA6Ly8ke2lwfToke2FkZHJlc3MucG9ydH0ke3BhdGhXaXRoUHJlZml4KCl9YDtcblxuXHRcdHFyY29kZShocmVmLCB7IHNtYWxsOiB0cnVlIH0pO1xuXG5cdFx0Y29uc29sZS5zdWNjZXNzKGDkvLrmnI3lmajmiJDlip/llZ/li5VgKTtcblxuXHRcdGNvbnNvbGUuc3VjY2VzcyhocmVmKTtcblxuXHRcdGlmIChpcCAhPT0gJzEyNy4wLjAuMScpXG5cdFx0e1xuXHRcdFx0bGV0IGlwID0gJzEyNy4wLjAuMSc7XG5cdFx0XHRocmVmID0gYGh0dHA6Ly8ke2lwfToke2FkZHJlc3MucG9ydH0ke3BhdGhXaXRoUHJlZml4KCl9YDtcblx0XHRcdGNvbnNvbGUuc3VjY2VzcyhocmVmKTtcblx0XHR9XG5cdH0pO1xuXG5cdHJldHVybiBfYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVNlcnZlclxuIl19