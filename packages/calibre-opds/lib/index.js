"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const opds_extra_1 = require("opds-extra");
const bluebird_1 = __importDefault(require("bluebird"));
function initMain(json, options) {
    return opds_extra_1.OPDSV1.Feed.deserialize(json, options);
}
exports.initMain = initMain;
function buildAsync(feed, fns) {
    return bluebird_1.default.resolve(feed)
        .then((feed) => {
        return bluebird_1.default.resolve(fns)
            .reduce((feed, fn) => {
            if (fn == null) {
                return feed;
            }
            return fn(feed);
        }, feed);
    });
}
exports.buildAsync = buildAsync;
function buildSync(feed, fns) {
    return fns
        .reduce((feed, fn) => {
        if (fn == null) {
            return feed;
        }
        return fn(feed);
    }, feed);
}
exports.buildSync = buildSync;
exports.default = initMain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDJDQUFvQztBQUlwQyx3REFBZ0M7QUFFaEMsU0FBZ0IsUUFBUSxDQUFDLElBQWlCLEVBQUUsT0FBdUI7SUFFbEUsT0FBTyxtQkFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQy9DLENBQUM7QUFIRCw0QkFHQztBQUVELFNBQWdCLFVBQVUsQ0FBaUIsSUFBc0IsRUFBRSxHQUFzQztJQUV4RyxPQUFPLGtCQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztTQUMzQixJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNkLE9BQU8sa0JBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO2FBQzFCLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRTtZQUNwQixJQUFJLEVBQUUsSUFBSSxJQUFJLEVBQ2Q7Z0JBQ0MsT0FBTyxJQUFJLENBQUE7YUFDWDtZQUNELE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2hCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUNWLENBQUMsQ0FBQyxDQUNGO0FBQ0YsQ0FBQztBQWRELGdDQWNDO0FBRUQsU0FBZ0IsU0FBUyxDQUFpQixJQUFPLEVBQUUsR0FBdUI7SUFFekUsT0FBTyxHQUFHO1NBQ1IsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFO1FBQ3BCLElBQUksRUFBRSxJQUFJLElBQUksRUFDZDtZQUNDLE9BQU8sSUFBSSxDQUFBO1NBQ1g7UUFDRCxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNoQixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQ1A7QUFDSCxDQUFDO0FBWEQsOEJBV0M7QUFFRCxrQkFBZSxRQUFRLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPUERTVjEgfSBmcm9tICdvcGRzLWV4dHJhJztcbmltcG9ydCB7IEZlZWQgfSBmcm9tICdvcGRzLWV4dHJhL2xpYi92MSc7XG5pbXBvcnQgeyBJUGFyc2VPcHRpb25zIH0gZnJvbSAndGEtanNvbi14JztcbmltcG9ydCB7IElUU1Jlc29sdmFibGUgfSBmcm9tICd0cy10eXBlJztcbmltcG9ydCBCbHVlYmlyZCBmcm9tICdibHVlYmlyZCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0TWFpbihqc29uOiBGZWVkLlRTVFlQRSwgb3B0aW9ucz86IElQYXJzZU9wdGlvbnMpXG57XG5cdHJldHVybiBPUERTVjEuRmVlZC5kZXNlcmlhbGl6ZShqc29uLCBvcHRpb25zKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkQXN5bmM8VCBleHRlbmRzIEZlZWQ+KGZlZWQ6IElUU1Jlc29sdmFibGU8VD4sIGZuczogKChmZWVkOiBUKSA9PiBJVFNSZXNvbHZhYmxlPFQ+KVtdKVxue1xuXHRyZXR1cm4gQmx1ZWJpcmQucmVzb2x2ZShmZWVkKVxuXHRcdC50aGVuKChmZWVkKSA9PiB7XG5cdFx0XHRyZXR1cm4gQmx1ZWJpcmQucmVzb2x2ZShmbnMpXG5cdFx0XHRcdC5yZWR1Y2UoKGZlZWQsIGZuKSA9PiB7XG5cdFx0XHRcdFx0aWYgKGZuID09IG51bGwpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZlZWRcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGZuKGZlZWQpXG5cdFx0XHRcdH0sIGZlZWQpXG5cdFx0fSlcblx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRTeW5jPFQgZXh0ZW5kcyBGZWVkPihmZWVkOiBULCBmbnM6ICgoZmVlZDogVCkgPT4gVClbXSlcbntcblx0cmV0dXJuIGZuc1xuXHRcdC5yZWR1Y2UoKGZlZWQsIGZuKSA9PiB7XG5cdFx0XHRpZiAoZm4gPT0gbnVsbClcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIGZlZWRcblx0XHRcdH1cblx0XHRcdHJldHVybiBmbihmZWVkKVxuXHRcdH0sIGZlZWQpXG5cdFx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0TWFpblxuXG4iXX0=