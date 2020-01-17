"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = require("address");
const os_1 = __importDefault(require("os"));
function searchIPAddress(options = {}) {
    let interfaces = os_1.default.networkInterfaces();
    let { filterInterfacesNot = defaultFilter, defaultIP = '127.0.0.1', filterIP } = options;
    filterInterfacesNot = _handleInputCallback(filterInterfacesNot, defaultFilter);
    filterIP = _handleInputCallback(filterIP, null);
    let fn = filterInterfacesNot;
    let keys = Object.keys(interfaces)
        .sort((a, b) => {
        let aa = fn(a, interfaces[a]);
        let bb = fn(b, interfaces[b]);
        if (aa != bb) {
            if (bb) {
                return -1;
            }
            else if (aa) {
                return 1;
            }
        }
        return 0;
    });
    let ip;
    for (let interfaceName of keys) {
        try {
            ip = address_1.ip(interfaceName);
        }
        catch (e) {
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
    return /vEthernet/.test(interfaceName);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHFDQUEwQztBQUMxQyw0Q0FBOEM7QUFFOUMsU0FBZ0IsZUFBZSxDQUFDLFVBSTVCLEVBQVM7SUFFWixJQUFJLFVBQVUsR0FBRyxZQUFFLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUV4QyxJQUFJLEVBQUUsbUJBQW1CLEdBQUcsYUFBYSxFQUFFLFNBQVMsR0FBRyxXQUFXLEVBQUUsUUFBUSxFQUFFLEdBQUcsT0FBTyxDQUFDO0lBRXpGLG1CQUFtQixHQUFHLG9CQUFvQixDQUFDLG1CQUFtQixFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQy9FLFFBQVEsR0FBRyxvQkFBb0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFFaEQsSUFBSSxFQUFFLEdBQUcsbUJBQW1CLENBQUM7SUFFN0IsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDaEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBRWQsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QixJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTlCLElBQUksRUFBRSxJQUFJLEVBQUUsRUFDWjtZQUNDLElBQUksRUFBRSxFQUNOO2dCQUNDLE9BQU8sQ0FBQyxDQUFDLENBQUE7YUFDVDtpQkFDSSxJQUFJLEVBQUUsRUFDWDtnQkFDQyxPQUFPLENBQUMsQ0FBQTthQUNSO1NBQ0Q7UUFFRCxPQUFPLENBQUMsQ0FBQTtJQUNULENBQUMsQ0FBQyxDQUNGO0lBRUQsSUFBSSxFQUFVLENBQUM7SUFFZixLQUFLLElBQUksYUFBYSxJQUFJLElBQUksRUFDOUI7UUFDQyxJQUNBO1lBQ0MsRUFBRSxHQUFHLFlBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUM5QjtRQUNELE9BQU8sQ0FBQyxFQUNSO1NBRUM7UUFFRCxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNyQztZQUNDLE1BQU07U0FDTjtLQUNEO0lBRUQsSUFBSSxDQUFDLEVBQUUsRUFDUDtRQUNDLEVBQUUsR0FBRyxTQUFTLElBQUksV0FBVyxDQUFDO0tBQzlCO0lBRUQsT0FBTyxFQUFFLENBQUM7QUFDWCxDQUFDO0FBOURELDBDQThEQztBQUVELFNBQWdCLGFBQWEsQ0FBQyxhQUFxQixFQUFFLGFBQXFDO0lBRXpGLE9BQU8sV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtBQUN2QyxDQUFDO0FBSEQsc0NBR0M7QUFFRCxTQUFnQixvQkFBb0IsQ0FBaUQsUUFBNkIsRUFBRSxlQUFrQjtJQUVySSxJQUFJLElBQUksR0FBRyxPQUFPLFFBQVEsQ0FBQztJQUUzQixJQUFJLFFBQVEsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLGVBQWUsS0FBSyxXQUFXLENBQUMsRUFDaEU7UUFDQyxRQUFRLEdBQUcsZUFBZSxDQUFDO0tBQzNCO1NBQ0ksSUFBSSxJQUFJLEtBQUssUUFBUSxFQUMxQjtRQUNDLGFBQWE7UUFDYixRQUFRLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBa0IsQ0FBQyxDQUFDO0tBQ2pEO1NBQ0ksSUFBSSxRQUFRLFlBQVksTUFBTSxFQUNuQztRQUNDLGNBQWM7UUFDZCxRQUFRLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFFLFFBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQzlDO1NBQ0ksSUFBSSxJQUFJLEtBQUssVUFBVSxFQUM1QjtRQUNDLE1BQU0sSUFBSSxTQUFTLENBQUMsd0RBQXdELElBQUksSUFBSSxRQUFRLEVBQUUsQ0FBQyxDQUFBO0tBQy9GO0lBRUQsT0FBTyxRQUFhLENBQUM7QUFDdEIsQ0FBQztBQXhCRCxvREF3QkM7QUFFRCxrQkFBZSxlQUFlLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpcCBhcyBJUEFkZHJlc3MgfSBmcm9tICdhZGRyZXNzJztcbmltcG9ydCBvcywgeyBOZXR3b3JrSW50ZXJmYWNlSW5mbyB9IGZyb20gXCJvc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gc2VhcmNoSVBBZGRyZXNzKG9wdGlvbnM6IHtcblx0ZmlsdGVySW50ZXJmYWNlc05vdDogc3RyaW5nIHwgUmVnRXhwIHwgKChpbnRlcmZhY2VOYW1lOiBzdHJpbmcsIGludGVyZmFjZURhdGE6IE5ldHdvcmtJbnRlcmZhY2VJbmZvW10pID0+IGJvb2xlYW4pO1xuXHRmaWx0ZXJJUDogc3RyaW5nIHwgUmVnRXhwIHwgKChpcDogc3RyaW5nKSA9PiBib29sZWFuKTtcblx0ZGVmYXVsdElQOiBzdHJpbmcsXG59ID0ge30gYXMgYW55KVxue1xuXHRsZXQgaW50ZXJmYWNlcyA9IG9zLm5ldHdvcmtJbnRlcmZhY2VzKCk7XG5cblx0bGV0IHsgZmlsdGVySW50ZXJmYWNlc05vdCA9IGRlZmF1bHRGaWx0ZXIsIGRlZmF1bHRJUCA9ICcxMjcuMC4wLjEnLCBmaWx0ZXJJUCB9ID0gb3B0aW9ucztcblxuXHRmaWx0ZXJJbnRlcmZhY2VzTm90ID0gX2hhbmRsZUlucHV0Q2FsbGJhY2soZmlsdGVySW50ZXJmYWNlc05vdCwgZGVmYXVsdEZpbHRlcik7XG5cdGZpbHRlcklQID0gX2hhbmRsZUlucHV0Q2FsbGJhY2soZmlsdGVySVAsIG51bGwpO1xuXG5cdGxldCBmbiA9IGZpbHRlckludGVyZmFjZXNOb3Q7XG5cblx0bGV0IGtleXMgPSBPYmplY3Qua2V5cyhpbnRlcmZhY2VzKVxuXHRcdC5zb3J0KChhLCBiKSA9PlxuXHRcdHtcblx0XHRcdGxldCBhYSA9IGZuKGEsIGludGVyZmFjZXNbYV0pO1xuXHRcdFx0bGV0IGJiID0gZm4oYiwgaW50ZXJmYWNlc1tiXSk7XG5cblx0XHRcdGlmIChhYSAhPSBiYilcblx0XHRcdHtcblx0XHRcdFx0aWYgKGJiKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmV0dXJuIC0xXG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZiAoYWEpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXR1cm4gMVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAwXG5cdFx0fSlcblx0O1xuXG5cdGxldCBpcDogc3RyaW5nO1xuXG5cdGZvciAobGV0IGludGVyZmFjZU5hbWUgb2Yga2V5cylcblx0e1xuXHRcdHRyeVxuXHRcdHtcblx0XHRcdGlwID0gSVBBZGRyZXNzKGludGVyZmFjZU5hbWUpO1xuXHRcdH1cblx0XHRjYXRjaCAoZSlcblx0XHR7XG5cblx0XHR9XG5cblx0XHRpZiAoaXAgJiYgKCFmaWx0ZXJJUCB8fCBmaWx0ZXJJUChpcCkpKVxuXHRcdHtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXG5cdGlmICghaXApXG5cdHtcblx0XHRpcCA9IGRlZmF1bHRJUCB8fCAnMTI3LjAuMC4xJztcblx0fVxuXG5cdHJldHVybiBpcDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRGaWx0ZXIoaW50ZXJmYWNlTmFtZTogc3RyaW5nLCBpbnRlcmZhY2VEYXRhOiBOZXR3b3JrSW50ZXJmYWNlSW5mb1tdKVxue1xuXHRyZXR1cm4gL3ZFdGhlcm5ldC8udGVzdChpbnRlcmZhY2VOYW1lKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX2hhbmRsZUlucHV0Q2FsbGJhY2s8VCBleHRlbmRzIChzOiBzdHJpbmcsIC4uLmFyZ3Y6IGFueSkgPT4gYm9vbGVhbj4oY2FsbGJhY2s6IHN0cmluZyB8IFJlZ0V4cCB8IFQsIGRlZmF1bHRDYWxsYmFjazogVCk6IFRcbntcblx0bGV0IHR5cGUgPSB0eXBlb2YgY2FsbGJhY2s7XG5cblx0aWYgKGNhbGxiYWNrID09IG51bGwgJiYgKHR5cGVvZiBkZWZhdWx0Q2FsbGJhY2sgIT09ICd1bmRlZmluZWQnKSlcblx0e1xuXHRcdGNhbGxiYWNrID0gZGVmYXVsdENhbGxiYWNrO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGUgPT09ICdzdHJpbmcnKVxuXHR7XG5cdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdGNhbGxiYWNrID0gKHMpID0+IHMuaW5jbHVkZXMoY2FsbGJhY2sgYXMgc3RyaW5nKTtcblx0fVxuXHRlbHNlIGlmIChjYWxsYmFjayBpbnN0YW5jZW9mIFJlZ0V4cClcblx0e1xuXHRcdC8vIEB0cy1pZ25vcmVxXG5cdFx0Y2FsbGJhY2sgPSAocykgPT4gKGNhbGxiYWNrIGFzIFJlZ0V4cCkudGVzdChzKVxuXHR9XG5cdGVsc2UgaWYgKHR5cGUgIT09ICdmdW5jdGlvbicpXG5cdHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBjYWxsYmFjayBtdXN0IGlzIHN0cmluZyAvIFJlZ0V4cCAvIGZ1bmN0aW9uLCBidXQgZ290ICR7dHlwZX0gJHtjYWxsYmFja31gKVxuXHR9XG5cblx0cmV0dXJuIGNhbGxiYWNrIGFzIFQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNlYXJjaElQQWRkcmVzc1xuIl19