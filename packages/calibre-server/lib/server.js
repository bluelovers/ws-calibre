"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const tslib_1 = require("tslib");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const serve_favicon_1 = (0, tslib_1.__importDefault)(require("serve-favicon"));
const bluebird_1 = (0, tslib_1.__importDefault)(require("bluebird"));
const array_hyper_unique_1 = require("array-hyper-unique");
const findLibrarys_1 = (0, tslib_1.__importDefault)(require("calibre-db/lib/findLibrarys"));
const upath2_1 = require("upath2");
const crypto_1 = require("./crypto");
const loadLibrary_1 = (0, tslib_1.__importDefault)(require("calibre-db/lib/loadLibrary"));
const handler_1 = (0, tslib_1.__importDefault)(require("./handler"));
const log_1 = require("./log");
const helmet_1 = (0, tslib_1.__importDefault)(require("helmet"));
const static_1 = (0, tslib_1.__importDefault)(require("./static"));
const package_json_1 = require("../package.json");
const favicon_1 = require("./server/favicon");
const qrcode_terminal_1 = (0, tslib_1.__importDefault)(require("qrcode-terminal"));
const address2_1 = (0, tslib_1.__importDefault)(require("address2"));
const options_1 = require("./server/options");
async function createServer(options) {
    let { cwd, port, calibrePaths, pathPrefix = '', dbFilter, siteTitle = `Calibre 書庫 by ${package_json_1.name}@${package_json_1.version}` } = options;
    port || (port = (0, options_1.defaultServerOptions)().port);
    cwd = (0, upath2_1.resolve)(cwd);
    calibrePaths !== null && calibrePaths !== void 0 ? calibrePaths : (calibrePaths = [cwd]);
    const pathWithPrefix = (a = '', ...input) => [pathPrefix, a, ...input].join('/');
    log_1.console.info(`處理伺服器設定中`);
    const app = (0, express_1.default)();
    app.use((0, helmet_1.default)());
    let localStatic = (0, upath2_1.resolve)(__dirname, '..', 'static');
    let staticPath = (0, upath2_1.resolve)(options.staticPath || localStatic);
    app.set('trust proxy', 1);
    app.use((0, serve_favicon_1.default)((0, favicon_1.parseFavicon)(options.favicon) || (0, favicon_1.defaultFavicon)(staticPath, localStatic)));
    app.use('/static', express_1.default.static(staticPath));
    let dbList = await bluebird_1.default
        .resolve((0, array_hyper_unique_1.array_unique)(calibrePaths).map(v => (0, upath2_1.resolve)(cwd, v)))
        .reduce(async (list, cwd) => {
        let lp = (0, findLibrarys_1.default)({
            cwd,
        });
        if (dbFilter) {
            lp = lp.filter(dbFilter);
        }
        await lp.tap(ls => list.push(...ls));
        return list;
    }, [])
        .reduce(async (a, row) => {
        let id = (0, crypto_1.hash_sha1)(row._fullpath);
        let p = pathWithPrefix(id);
        app.use(`${p}`, (0, static_1.default)(row._fulldir, {
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
                return (0, loadLibrary_1.default)(row)
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
        log_1.console.debug(...(0, log_1.logRequest)(req, res));
        return next();
    });
    let sharedOptions = {
        app,
        port,
        pathWithPrefix,
        dbList,
        siteTitle,
    };
    app.use((0, handler_1.default)(sharedOptions));
    let _app = app.listen(port, function () {
        let address = _app.address();
        let ip = (0, address2_1.default)();
        let href = `http://${ip}:${address.port}${pathWithPrefix()}`;
        qrcode_terminal_1.default.generate(href, { small: true });
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
//# sourceMappingURL=server.js.map