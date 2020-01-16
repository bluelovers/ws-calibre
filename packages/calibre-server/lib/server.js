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
        log_1.console.debug(p, `=>`, row._fulldir);
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
        log_1.console.success(`listening on https://127.0.0.1:${address.port}${pathWithPrefix()}`);
    });
    return _app;
}
exports.createServer = createServer;
exports.default = createServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQThEO0FBQzlELGtFQUFvQztBQUVwQyx3REFBZ0M7QUFHaEMsMkRBQWtEO0FBQ2xELCtFQUF1RDtBQUN2RCxtQ0FBaUM7QUFDakMscUNBQXFDO0FBQ3JDLDZFQUFxRDtBQUdyRCx3REFBc0M7QUFDdEMsK0JBQTBEO0FBRTFELG9EQUE0QjtBQUM1QixzREFBbUM7QUFDbkMsa0RBQXlFO0FBQ3pFLDhDQUFnRTtBQUV6RCxLQUFLLFVBQVUsWUFBWSxDQUFDLE9BYWxDO0lBRUEsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEdBQUcsSUFBSSxFQUFFLFlBQVksRUFBRSxVQUFVLEdBQUcsRUFBRSxFQUFFLFFBQVEsRUFBRSxTQUFTLEdBQUcsaUJBQWlCLG1CQUFPLElBQUksc0JBQVUsRUFBRSxFQUFFLEdBQUcsT0FBTyxDQUFDO0lBRWxJLEdBQUcsR0FBRyxnQkFBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRW5CLElBQUksWUFBWSxJQUFJLElBQUksRUFDeEI7UUFDQyxZQUFZLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNyQjtJQUVELE1BQU0sY0FBYyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxHQUFHLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWpGLE1BQU0sR0FBRyxHQUFHLGlCQUFPLEVBQUUsQ0FBQztJQUV0QixHQUFHLENBQUMsR0FBRyxDQUFDLGdCQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ2xCLElBQUksV0FBVyxHQUFHLGdCQUFPLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUVyRCxJQUFJLFVBQVUsR0FBRyxnQkFBTyxDQUFDLE9BQU8s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RyxDQUFDLEdBQUcsQ0FBQyxpQkFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFFdEMsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7UUFFM0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFJekIsQ0FBQztRQUVGLGFBQU8sQ0FBQyxPQUFPLENBQUMsa0NBQWtDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3RGLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUE7QUFDWixDQUFDO0FBckhELG9DQXFIQztBQUVELGtCQUFlLFlBQVksQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzLCB7IEV4cHJlc3MsIFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgZmF2aWNvbiBmcm9tICdzZXJ2ZS1mYXZpY29uJztcbmltcG9ydCBtb21lbnQgZnJvbSAnLi9tb21lbnQnO1xuaW1wb3J0IEJsdWViaXJkIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCB7IElGaW5kTGlicmFyeXMsIEVudW1EYXRhRm9ybWF0TG93ZXJDYXNlIH0gZnJvbSAnY2FsaWJyZS1kYic7XG5pbXBvcnQgeyBJVFNSZXNvbHZhYmxlIH0gZnJvbSAndHMtdHlwZSc7XG5pbXBvcnQgeyBhcnJheV91bmlxdWUgfSBmcm9tICdhcnJheS1oeXBlci11bmlxdWUnO1xuaW1wb3J0IGZpbmRMaWJyYXJ5cyBmcm9tICdjYWxpYnJlLWRiL2xpYi9maW5kTGlicmFyeXMnO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJ1cGF0aDJcIjtcbmltcG9ydCB7IGhhc2hfc2hhMSB9IGZyb20gJy4vY3J5cHRvJztcbmltcG9ydCBsb2FkTGlicmFyeSBmcm9tICdjYWxpYnJlLWRiL2xpYi9sb2FkTGlicmFyeSc7XG5pbXBvcnQgeyBEQiB9IGZyb20gJ2NhbGlicmUtZGIvbGliL0RCJztcbmltcG9ydCB7IElGaW5kTGlicmFyeXNTZXJ2ZXIsIElGYXZpY29uRGF0YSwgSVNoYXJlZEhhbmRsZXJPcHRpb25zIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgY3JlYXRlSGFuZGxlciBmcm9tICcuL2hhbmRsZXInO1xuaW1wb3J0IHsgY29uc29sZSwgY29uc29sZURlYnVnLCBsb2dSZXF1ZXN0IH0gZnJvbSAnLi9sb2cnO1xuaW1wb3J0IHsgTmV4dEZ1bmN0aW9uIH0gZnJvbSAnZXhwcmVzcy1zZXJ2ZS1zdGF0aWMtY29yZSc7XG5pbXBvcnQgaGVsbWV0IGZyb20gJ2hlbG1ldCc7XG5pbXBvcnQgc3RhdGljRXh0cmEgZnJvbSAnLi9zdGF0aWMnO1xuaW1wb3J0IHsgbmFtZSBhcyBwa2dOYW1lLCB2ZXJzaW9uIGFzIHBrZ1ZlcnNpb24gfSBmcm9tICcuLi9wYWNrYWdlLmpzb24nO1xuaW1wb3J0IHsgcGFyc2VGYXZpY29uLCBkZWZhdWx0RmF2aWNvbiB9IGZyb20gJy4vc2VydmVyL2Zhdmljb24nO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlU2VydmVyKG9wdGlvbnM6IHtcblx0Y3dkOiBzdHJpbmcsXG5cdHBvcnQ/OiBudW1iZXIsXG5cdHBhdGhQcmVmaXg/OiBzdHJpbmcsXG5cdGNhbGlicmVQYXRocz86IHN0cmluZ1tdLFxuXHRkYkZpbHRlcj8ocm93OiB7XG5cdFx0bmFtZSxcblx0XHRfcGF0aCxcblx0XHRfZnVsbHBhdGgsXG5cdH0pOiBJVFNSZXNvbHZhYmxlPGJvb2xlYW4+LFxuXHRzaXRlVGl0bGU/OiBzdHJpbmcsXG5cdGZhdmljb24/OiBJRmF2aWNvbkRhdGEsXG5cdHN0YXRpY1BhdGg/OiBzdHJpbmcsXG59KVxue1xuXHRsZXQgeyBjd2QsIHBvcnQgPSAzMDAwLCBjYWxpYnJlUGF0aHMsIHBhdGhQcmVmaXggPSAnJywgZGJGaWx0ZXIsIHNpdGVUaXRsZSA9IGBDYWxpYnJlIOabuOW6qyBieSAke3BrZ05hbWV9QCR7cGtnVmVyc2lvbn1gIH0gPSBvcHRpb25zO1xuXG5cdGN3ZCA9IHJlc29sdmUoY3dkKTtcblxuXHRpZiAoY2FsaWJyZVBhdGhzID09IG51bGwpXG5cdHtcblx0XHRjYWxpYnJlUGF0aHMgPSBbY3dkXTtcblx0fVxuXG5cdGNvbnN0IHBhdGhXaXRoUHJlZml4ID0gKGEgPSAnJywgLi4uaW5wdXQpID0+IFtwYXRoUHJlZml4LCBhLCAuLi5pbnB1dF0uam9pbignLycpO1xuXG5cdGNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcblxuXHRhcHAudXNlKGhlbG1ldCgpKTtcblx0bGV0IGxvY2FsU3RhdGljID0gcmVzb2x2ZShfX2Rpcm5hbWUsICcuLicsICdzdGF0aWMnKTtcblxuXHRsZXQgc3RhdGljUGF0aCA9IHJlc29sdmUob3B0aW9ucy5zdGF0aWNQYXRoIHx8IGxvY2FsU3RhdGljKTtcblxuXHRhcHAuc2V0KCd0cnVzdCBwcm94eScsIDEpO1xuXG5cdGFwcC51c2UoZmF2aWNvbihwYXJzZUZhdmljb24ob3B0aW9ucy5mYXZpY29uKSB8fCBkZWZhdWx0RmF2aWNvbihzdGF0aWNQYXRoLCBsb2NhbFN0YXRpYykpKTtcblx0YXBwLnVzZSgnL3N0YXRpYycsIGV4cHJlc3Muc3RhdGljKHN0YXRpY1BhdGgpKTtcblxuXHRsZXQgZGJMaXN0ID0gYXdhaXQgQmx1ZWJpcmRcblx0XHQucmVzb2x2ZShhcnJheV91bmlxdWUoY2FsaWJyZVBhdGhzKS5tYXAodiA9PiByZXNvbHZlKGN3ZCwgdikpKVxuXHRcdC5yZWR1Y2UoYXN5bmMgKGxpc3QsIGN3ZCkgPT5cblx0XHR7XG5cblx0XHRcdGxldCBscCA9IGZpbmRMaWJyYXJ5cyh7XG5cdFx0XHRcdGN3ZCxcblx0XHRcdH0pO1xuXG5cdFx0XHRpZiAoZGJGaWx0ZXIpXG5cdFx0XHR7XG5cdFx0XHRcdGxwID0gbHAuZmlsdGVyKGRiRmlsdGVyKVxuXHRcdFx0fVxuXG5cdFx0XHRhd2FpdCBscC50YXAobHMgPT4gbGlzdC5wdXNoKC4uLmxzKSk7XG5cblx0XHRcdHJldHVybiBsaXN0XG5cdFx0fSwgW10gYXMgSUZpbmRMaWJyYXJ5c1tdKVxuXHRcdC5yZWR1Y2UoYXN5bmMgKGEsIHJvdykgPT5cblx0XHR7XG5cblx0XHRcdGxldCBpZCA9IGhhc2hfc2hhMShyb3cuX2Z1bGxwYXRoKTtcblxuXHRcdFx0bGV0IHAgPSBwYXRoV2l0aFByZWZpeChpZCk7XG5cblx0XHRcdGFwcC51c2UoYCR7cH1gLCBzdGF0aWNFeHRyYShyb3cuX2Z1bGxkaXIsIHtcblx0XHRcdFx0ZXh0ZW5zaW9uczogW0VudW1EYXRhRm9ybWF0TG93ZXJDYXNlLkVQVUJdLFxuXHRcdFx0XHRpbmRleDogZmFsc2UsXG5cdFx0XHR9KSk7XG5cdFx0XHRjb25zb2xlLmRlYnVnKHAsIGA9PmAsIHJvdy5fZnVsbGRpcik7XG5cblx0XHRcdGFbaWRdID0ge1xuXHRcdFx0XHQuLi5yb3csXG5cdFx0XHRcdGlkLFxuXHRcdFx0XHRkYjogbnVsbCxcblx0XHRcdFx0bGF6eWxvYWQoKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0YVtpZF0ubGF6eWxvYWQgPSAoKSA9PiBCbHVlYmlyZC5yZXNvbHZlKGFbaWRdLmRiKTtcblxuXHRcdFx0XHRcdHJldHVybiBsb2FkTGlicmFyeShyb3cpXG5cdFx0XHRcdFx0XHQudGFwKGRiID0+XG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGFbaWRdLmRiID0gZGI7XG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0O1xuXHRcdFx0XHR9LFxuXHRcdFx0fTtcblxuXHRcdFx0cmV0dXJuIGE7XG5cdFx0fSwge30gYXMgUmVjb3JkPHN0cmluZywgSUZpbmRMaWJyYXJ5c1NlcnZlcj4pXG5cdDtcblxuXHRhcHAudXNlKChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikgPT4ge1xuXHRcdGNvbnNvbGUuZGVidWcoLi4ubG9nUmVxdWVzdChyZXEsIHJlcykpO1xuXHRcdHJldHVybiBuZXh0KCk7XG5cdH0pO1xuXG5cdGxldCBzaGFyZWRPcHRpb25zOiBJU2hhcmVkSGFuZGxlck9wdGlvbnMgPSB7XG5cdFx0YXBwLFxuXHRcdHBvcnQsXG5cdFx0cGF0aFdpdGhQcmVmaXgsXG5cdFx0ZGJMaXN0LFxuXHRcdHNpdGVUaXRsZSxcblx0fTtcblxuXHRhcHAudXNlKGNyZWF0ZUhhbmRsZXIoc2hhcmVkT3B0aW9ucykpO1xuXG5cdGxldCBfYXBwID0gYXBwLmxpc3Rlbihwb3J0LCBmdW5jdGlvbiAoKVxuXHR7XG5cdFx0bGV0IGFkZHJlc3MgPSBfYXBwLmFkZHJlc3MoKSBhcyB7XG5cdFx0XHRhZGRyZXNzOiBzdHJpbmcsXG5cdFx0XHRmYW1pbHk6IHN0cmluZyB8ICdJUHY2Jyxcblx0XHRcdHBvcnQ6IG51bWJlcixcblx0XHR9O1xuXG5cdFx0Y29uc29sZS5zdWNjZXNzKGBsaXN0ZW5pbmcgb24gaHR0cHM6Ly8xMjcuMC4wLjE6JHthZGRyZXNzLnBvcnR9JHtwYXRoV2l0aFByZWZpeCgpfWApO1xuXHR9KTtcblxuXHRyZXR1cm4gX2FwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVTZXJ2ZXJcbiJdfQ==