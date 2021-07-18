"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const tslib_1 = require("tslib");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const serve_favicon_1 = (0, tslib_1.__importDefault)(require("serve-favicon"));
const bluebird_1 = (0, tslib_1.__importDefault)(require("bluebird"));
const upath2_1 = require("upath2");
const handler_1 = (0, tslib_1.__importDefault)(require("./handler"));
const log_1 = require("./log");
const helmet_1 = (0, tslib_1.__importDefault)(require("helmet"));
const static_1 = (0, tslib_1.__importDefault)(require("./static"));
const package_json_1 = require("../package.json");
const favicon_1 = require("./server/favicon");
const qrcode_terminal_1 = (0, tslib_1.__importDefault)(require("qrcode-terminal"));
const address2_1 = (0, tslib_1.__importDefault)(require("address2"));
const options_1 = require("./server/options");
const buildList_1 = require("./db/buildList");
const calibre_env_1 = require("calibre-env");
const path_1 = require("path");
async function createServer(options) {
    var _a;
    let { cwd, port, calibrePaths, pathPrefix = '', dbFilter, siteTitle = `Calibre 書庫 by ${package_json_1.name}@${package_json_1.version}`, } = options;
    port || (port = (0, options_1.defaultServerOptions)().port);
    cwd = (0, upath2_1.resolve)(cwd);
    if (!(calibrePaths === null || calibrePaths === void 0 ? void 0 : calibrePaths.length)) {
        // @ts-ignore
        calibrePaths = (_a = (0, calibre_env_1.envCalibrePath)(process.env)) !== null && _a !== void 0 ? _a : cwd;
        if (typeof calibrePaths === 'string') {
            // @ts-ignore
            calibrePaths = calibrePaths.split(path_1.delimiter);
        }
        else {
            // @ts-ignore
            calibrePaths = [calibrePaths];
        }
        calibrePaths = calibrePaths.flat().filter(v => Boolean(v) && v !== 'undefined' && v !== 'null');
    }
    const pathWithPrefix = (a = '', ...input) => [pathPrefix, a, ...input].join('/');
    log_1.console.info(`處理伺服器設定中`);
    const app = (0, express_1.default)();
    app.use((0, helmet_1.default)());
    let localStatic = (0, upath2_1.resolve)(__dirname, '..', 'static');
    let staticPath = (0, upath2_1.resolve)(options.staticPath || localStatic);
    app.set('trust proxy', 1);
    app.use((0, serve_favicon_1.default)((0, favicon_1.parseFavicon)(options.favicon) || (0, favicon_1.defaultFavicon)(staticPath, localStatic)));
    app.use('/static', express_1.default.static(staticPath));
    let dbList = await (0, buildList_1.buildLibraryList)({
        calibrePaths,
        dbFilter,
        cwd,
    });
    if (!Object.keys(dbList).length) {
        let err = `無法在目標路徑內找到任何 Calibre metadata.db 資料庫`;
        log_1.console.error(err);
        return bluebird_1.default.reject(new Error(err));
    }
    Object.entries(dbList)
        .forEach(([id, row]) => {
        let p = pathWithPrefix(id);
        app.use(`${p}`, (0, static_1.default)(row._fulldir, {
            extensions: ["epub" /* EPUB */, 'cb7', 'cba', 'cbr', 'cbt', 'cbz'],
            index: false,
        }));
        log_1.console.debug(`[static]`, p, `=>`, row._fulldir);
    });
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