"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._handleInputCallback = exports.defaultFilter = exports.searchIPAddress = void 0;
const tslib_1 = require("tslib");
const address_1 = require("address");
const os_1 = (0, tslib_1.__importDefault)(require("os"));
function searchIPAddress(options = {}) {
    let interfaces = os_1.default.networkInterfaces();
    let { filterInterfacesNot = defaultFilter, defaultIP = '127.0.0.1', filterIP, family = 'IPv4' } = options;
    filterInterfacesNot = _handleInputCallback(filterInterfacesNot, defaultFilter);
    filterIP = _handleInputCallback(filterIP, (ip) => ip && ip !== '127.0.0.1' && ip !== '0.0.0.0');
    let fn = filterInterfacesNot;
    let keys = Object.keys(interfaces)
        .sort((a, b) => {
        let aa = fn(a, interfaces[a]);
        let bb = fn(b, interfaces[b]);
        if (aa != bb) {
            if (bb) {
                return 1;
            }
            else if (aa) {
                return -1;
            }
        }
        return 0;
    });
    let ip;
    let fns = family === 'IPv6' ? [
        address_1.ipv6,
        address_1.ip,
    ] : [
        address_1.ip,
        address_1.ipv6,
    ];
    for (let interfaceName of keys) {
        for (let fn of fns) {
            try {
                ip = fn(interfaceName);
                break;
            }
            catch (e) {
            }
        }
        if (ip && (!filterIP || filterIP(ip))) {
            break;
        }
    }
    if (!ip) {
        ip = defaultIP || '127.0.0.1';
    }
    return ip;
}
exports.searchIPAddress = searchIPAddress;
function defaultFilter(interfaceName, interfaceData) {
    return !/vEthernet/i.test(interfaceName) && interfaceData.some(data => !data.internal);
}
exports.defaultFilter = defaultFilter;
function _handleInputCallback(callback, defaultCallback) {
    let type = typeof callback;
    if (callback == null && (typeof defaultCallback !== 'undefined')) {
        callback = defaultCallback;
    }
    else if (type === 'string') {
        // @ts-ignore
        callback = (s) => s.includes(callback);
    }
    else if (callback instanceof RegExp) {
        // @ts-ignoreq
        callback = (s) => callback.test(s);
    }
    else if (type !== 'function') {
        throw new TypeError(`callback must is string / RegExp / function, but got ${type} ${callback}`);
    }
    return callback;
}
exports._handleInputCallback = _handleInputCallback;
exports.default = searchIPAddress;
//# sourceMappingURL=index.js.map