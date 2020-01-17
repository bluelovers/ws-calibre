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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHFDQUEwQztBQUMxQyw0Q0FBOEM7QUFFOUMsU0FBZ0IsZUFBZSxDQUFDLFVBSTVCLEVBQUU7SUFFTCxJQUFJLFVBQVUsR0FBRyxZQUFFLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUV4QyxJQUFJLEVBQUUsbUJBQW1CLEdBQUcsYUFBYSxFQUFFLFNBQVMsR0FBRyxXQUFXLEVBQUUsUUFBUSxFQUFFLEdBQUcsT0FBTyxDQUFDO0lBRXpGLG1CQUFtQixHQUFHLG9CQUFvQixDQUFDLG1CQUFtQixFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQy9FLFFBQVEsR0FBRyxvQkFBb0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFFaEQsSUFBSSxFQUFFLEdBQUcsbUJBQW1CLENBQUM7SUFFN0IsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDaEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBRWQsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QixJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTlCLElBQUksRUFBRSxJQUFJLEVBQUUsRUFDWjtZQUNDLElBQUksRUFBRSxFQUNOO2dCQUNDLE9BQU8sQ0FBQyxDQUFDLENBQUE7YUFDVDtpQkFDSSxJQUFJLEVBQUUsRUFDWDtnQkFDQyxPQUFPLENBQUMsQ0FBQTthQUNSO1NBQ0Q7UUFFRCxPQUFPLENBQUMsQ0FBQTtJQUNULENBQUMsQ0FBQyxDQUNGO0lBRUQsSUFBSSxFQUFVLENBQUM7SUFFZixLQUFLLElBQUksYUFBYSxJQUFJLElBQUksRUFDOUI7UUFDQyxJQUNBO1lBQ0MsRUFBRSxHQUFHLFlBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUM5QjtRQUNELE9BQU8sQ0FBQyxFQUNSO1NBRUM7UUFFRCxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNyQztZQUNDLE1BQU07U0FDTjtLQUNEO0lBRUQsSUFBSSxDQUFDLEVBQUUsRUFDUDtRQUNDLEVBQUUsR0FBRyxTQUFTLElBQUksV0FBVyxDQUFDO0tBQzlCO0lBRUQsT0FBTyxFQUFFLENBQUM7QUFDWCxDQUFDO0FBOURELDBDQThEQztBQUVELFNBQWdCLGFBQWEsQ0FBQyxhQUFxQixFQUFFLGFBQXFDO0lBRXpGLE9BQU8sV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtBQUN2QyxDQUFDO0FBSEQsc0NBR0M7QUFFRCxTQUFnQixvQkFBb0IsQ0FBaUQsUUFBNkIsRUFBRSxlQUFrQjtJQUVySSxJQUFJLElBQUksR0FBRyxPQUFPLFFBQVEsQ0FBQztJQUUzQixJQUFJLFFBQVEsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLGVBQWUsS0FBSyxXQUFXLENBQUMsRUFDaEU7UUFDQyxRQUFRLEdBQUcsZUFBZSxDQUFDO0tBQzNCO1NBQ0ksSUFBSSxJQUFJLEtBQUssUUFBUSxFQUMxQjtRQUNDLGFBQWE7UUFDYixRQUFRLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBa0IsQ0FBQyxDQUFDO0tBQ2pEO1NBQ0ksSUFBSSxRQUFRLFlBQVksTUFBTSxFQUNuQztRQUNDLGNBQWM7UUFDZCxRQUFRLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFFLFFBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQzlDO1NBQ0ksSUFBSSxJQUFJLEtBQUssVUFBVSxFQUM1QjtRQUNDLE1BQU0sSUFBSSxTQUFTLENBQUMsd0RBQXdELElBQUksSUFBSSxRQUFRLEVBQUUsQ0FBQyxDQUFBO0tBQy9GO0lBRUQsT0FBTyxRQUFhLENBQUM7QUFDdEIsQ0FBQztBQXhCRCxvREF3QkM7QUFFRCxrQkFBZSxlQUFlLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpcCBhcyBJUEFkZHJlc3MgfSBmcm9tICdhZGRyZXNzJztcbmltcG9ydCBvcywgeyBOZXR3b3JrSW50ZXJmYWNlSW5mbyB9IGZyb20gXCJvc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gc2VhcmNoSVBBZGRyZXNzKG9wdGlvbnM6IHtcblx0ZmlsdGVySW50ZXJmYWNlc05vdD86IHN0cmluZyB8IFJlZ0V4cCB8ICgoaW50ZXJmYWNlTmFtZTogc3RyaW5nLCBpbnRlcmZhY2VEYXRhOiBOZXR3b3JrSW50ZXJmYWNlSW5mb1tdKSA9PiBib29sZWFuKTtcblx0ZmlsdGVySVA/OiBzdHJpbmcgfCBSZWdFeHAgfCAoKGlwOiBzdHJpbmcpID0+IGJvb2xlYW4pO1xuXHRkZWZhdWx0SVA/OiBzdHJpbmcsXG59ID0ge30pXG57XG5cdGxldCBpbnRlcmZhY2VzID0gb3MubmV0d29ya0ludGVyZmFjZXMoKTtcblxuXHRsZXQgeyBmaWx0ZXJJbnRlcmZhY2VzTm90ID0gZGVmYXVsdEZpbHRlciwgZGVmYXVsdElQID0gJzEyNy4wLjAuMScsIGZpbHRlcklQIH0gPSBvcHRpb25zO1xuXG5cdGZpbHRlckludGVyZmFjZXNOb3QgPSBfaGFuZGxlSW5wdXRDYWxsYmFjayhmaWx0ZXJJbnRlcmZhY2VzTm90LCBkZWZhdWx0RmlsdGVyKTtcblx0ZmlsdGVySVAgPSBfaGFuZGxlSW5wdXRDYWxsYmFjayhmaWx0ZXJJUCwgbnVsbCk7XG5cblx0bGV0IGZuID0gZmlsdGVySW50ZXJmYWNlc05vdDtcblxuXHRsZXQga2V5cyA9IE9iamVjdC5rZXlzKGludGVyZmFjZXMpXG5cdFx0LnNvcnQoKGEsIGIpID0+XG5cdFx0e1xuXHRcdFx0bGV0IGFhID0gZm4oYSwgaW50ZXJmYWNlc1thXSk7XG5cdFx0XHRsZXQgYmIgPSBmbihiLCBpbnRlcmZhY2VzW2JdKTtcblxuXHRcdFx0aWYgKGFhICE9IGJiKVxuXHRcdFx0e1xuXHRcdFx0XHRpZiAoYmIpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXR1cm4gLTFcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmIChhYSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJldHVybiAxXG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIDBcblx0XHR9KVxuXHQ7XG5cblx0bGV0IGlwOiBzdHJpbmc7XG5cblx0Zm9yIChsZXQgaW50ZXJmYWNlTmFtZSBvZiBrZXlzKVxuXHR7XG5cdFx0dHJ5XG5cdFx0e1xuXHRcdFx0aXAgPSBJUEFkZHJlc3MoaW50ZXJmYWNlTmFtZSk7XG5cdFx0fVxuXHRcdGNhdGNoIChlKVxuXHRcdHtcblxuXHRcdH1cblxuXHRcdGlmIChpcCAmJiAoIWZpbHRlcklQIHx8IGZpbHRlcklQKGlwKSkpXG5cdFx0e1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cblx0aWYgKCFpcClcblx0e1xuXHRcdGlwID0gZGVmYXVsdElQIHx8ICcxMjcuMC4wLjEnO1xuXHR9XG5cblx0cmV0dXJuIGlwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdEZpbHRlcihpbnRlcmZhY2VOYW1lOiBzdHJpbmcsIGludGVyZmFjZURhdGE6IE5ldHdvcmtJbnRlcmZhY2VJbmZvW10pXG57XG5cdHJldHVybiAvdkV0aGVybmV0Ly50ZXN0KGludGVyZmFjZU5hbWUpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfaGFuZGxlSW5wdXRDYWxsYmFjazxUIGV4dGVuZHMgKHM6IHN0cmluZywgLi4uYXJndjogYW55KSA9PiBib29sZWFuPihjYWxsYmFjazogc3RyaW5nIHwgUmVnRXhwIHwgVCwgZGVmYXVsdENhbGxiYWNrOiBUKTogVFxue1xuXHRsZXQgdHlwZSA9IHR5cGVvZiBjYWxsYmFjaztcblxuXHRpZiAoY2FsbGJhY2sgPT0gbnVsbCAmJiAodHlwZW9mIGRlZmF1bHRDYWxsYmFjayAhPT0gJ3VuZGVmaW5lZCcpKVxuXHR7XG5cdFx0Y2FsbGJhY2sgPSBkZWZhdWx0Q2FsbGJhY2s7XG5cdH1cblx0ZWxzZSBpZiAodHlwZSA9PT0gJ3N0cmluZycpXG5cdHtcblx0XHQvLyBAdHMtaWdub3JlXG5cdFx0Y2FsbGJhY2sgPSAocykgPT4gcy5pbmNsdWRlcyhjYWxsYmFjayBhcyBzdHJpbmcpO1xuXHR9XG5cdGVsc2UgaWYgKGNhbGxiYWNrIGluc3RhbmNlb2YgUmVnRXhwKVxuXHR7XG5cdFx0Ly8gQHRzLWlnbm9yZXFcblx0XHRjYWxsYmFjayA9IChzKSA9PiAoY2FsbGJhY2sgYXMgUmVnRXhwKS50ZXN0KHMpXG5cdH1cblx0ZWxzZSBpZiAodHlwZSAhPT0gJ2Z1bmN0aW9uJylcblx0e1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYGNhbGxiYWNrIG11c3QgaXMgc3RyaW5nIC8gUmVnRXhwIC8gZnVuY3Rpb24sIGJ1dCBnb3QgJHt0eXBlfSAke2NhbGxiYWNrfWApXG5cdH1cblxuXHRyZXR1cm4gY2FsbGJhY2sgYXMgVDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc2VhcmNoSVBBZGRyZXNzXG4iXX0=