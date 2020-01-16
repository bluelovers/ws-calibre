"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = require("address");
const os_1 = __importDefault(require("os"));
function searchIPAddress() {
    let interfaces = os_1.default.networkInterfaces();
    let keys = Object.keys(interfaces)
        .sort((a, b) => {
        let aa = /vEthernet/.test(a);
        let bb = /vEthernet/.test(b);
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
        if (ip) {
            break;
        }
    }
    if (!ip) {
        ip = '127.0.0.1';
    }
    return ip;
}
exports.searchIPAddress = searchIPAddress;
exports.default = searchIPAddress;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHFDQUEwQztBQUMxQyw0Q0FBb0I7QUFFcEIsU0FBZ0IsZUFBZTtJQUU5QixJQUFJLFVBQVUsR0FBRyxZQUFFLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUV4QyxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztTQUNoQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFFZCxJQUFJLEVBQUUsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdCLElBQUksRUFBRSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFN0IsSUFBSSxFQUFFLElBQUksRUFBRSxFQUNaO1lBQ0MsSUFBSSxFQUFFLEVBQ047Z0JBQ0MsT0FBTyxDQUFDLENBQUMsQ0FBQTthQUNUO2lCQUNJLElBQUksRUFBRSxFQUNYO2dCQUNDLE9BQU8sQ0FBQyxDQUFBO2FBQ1I7U0FDRDtRQUVELE9BQU8sQ0FBQyxDQUFBO0lBQ1QsQ0FBQyxDQUFDLENBQ0Y7SUFFRCxJQUFJLEVBQVUsQ0FBQztJQUVmLEtBQUssSUFBSSxhQUFhLElBQUksSUFBSSxFQUM5QjtRQUNDLElBQ0E7WUFDQyxFQUFFLEdBQUcsWUFBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQzlCO1FBQ0QsT0FBTyxDQUFDLEVBQ1I7U0FFQztRQUVELElBQUksRUFBRSxFQUNOO1lBQ0MsTUFBTTtTQUNOO0tBQ0Q7SUFFRCxJQUFJLENBQUMsRUFBRSxFQUNQO1FBQ0MsRUFBRSxHQUFHLFdBQVcsQ0FBQztLQUNqQjtJQUVELE9BQU8sRUFBRSxDQUFDO0FBQ1gsQ0FBQztBQW5ERCwwQ0FtREM7QUFFRCxrQkFBZSxlQUFlLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpcCBhcyBJUEFkZHJlc3MgfSBmcm9tICdhZGRyZXNzJztcbmltcG9ydCBvcyBmcm9tIFwib3NcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHNlYXJjaElQQWRkcmVzcygpXG57XG5cdGxldCBpbnRlcmZhY2VzID0gb3MubmV0d29ya0ludGVyZmFjZXMoKTtcblxuXHRsZXQga2V5cyA9IE9iamVjdC5rZXlzKGludGVyZmFjZXMpXG5cdFx0LnNvcnQoKGEsIGIpID0+XG5cdFx0e1xuXHRcdFx0bGV0IGFhID0gL3ZFdGhlcm5ldC8udGVzdChhKTtcblx0XHRcdGxldCBiYiA9IC92RXRoZXJuZXQvLnRlc3QoYik7XG5cblx0XHRcdGlmIChhYSAhPSBiYilcblx0XHRcdHtcblx0XHRcdFx0aWYgKGJiKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmV0dXJuIC0xXG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZiAoYWEpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXR1cm4gMVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAwXG5cdFx0fSlcblx0O1xuXG5cdGxldCBpcDogc3RyaW5nO1xuXG5cdGZvciAobGV0IGludGVyZmFjZU5hbWUgb2Yga2V5cylcblx0e1xuXHRcdHRyeVxuXHRcdHtcblx0XHRcdGlwID0gSVBBZGRyZXNzKGludGVyZmFjZU5hbWUpO1xuXHRcdH1cblx0XHRjYXRjaCAoZSlcblx0XHR7XG5cblx0XHR9XG5cblx0XHRpZiAoaXApXG5cdFx0e1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cblx0aWYgKCFpcClcblx0e1xuXHRcdGlwID0gJzEyNy4wLjAuMSc7XG5cdH1cblxuXHRyZXR1cm4gaXA7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNlYXJjaElQQWRkcmVzc1xuIl19