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
            return fn(feed);
        }, feed);
    });
}
exports.buildAsync = buildAsync;
function buildSync(feed, fns) {
    return fns
        .reduce((feed, fn) => {
        return fn(feed);
    }, feed);
}
exports.buildSync = buildSync;
exports.default = initMain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDJDQUFvQztBQUlwQyx3REFBZ0M7QUFFaEMsU0FBZ0IsUUFBUSxDQUFDLElBQWlCLEVBQUUsT0FBdUI7SUFFbEUsT0FBTyxtQkFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQy9DLENBQUM7QUFIRCw0QkFHQztBQUVELFNBQWdCLFVBQVUsQ0FBaUIsSUFBc0IsRUFBRSxHQUFzQztJQUV4RyxPQUFPLGtCQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztTQUMzQixJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNkLE9BQU8sa0JBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO2FBQzFCLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRTtZQUNwQixPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNoQixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDVixDQUFDLENBQUMsQ0FDRjtBQUNGLENBQUM7QUFWRCxnQ0FVQztBQUVELFNBQWdCLFNBQVMsQ0FBaUIsSUFBTyxFQUFFLEdBQXVCO0lBRXpFLE9BQU8sR0FBRztTQUNSLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRTtRQUNwQixPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNoQixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQ1A7QUFDSCxDQUFDO0FBUEQsOEJBT0M7QUFFRCxrQkFBZSxRQUFRLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPUERTVjEgfSBmcm9tICdvcGRzLWV4dHJhJztcbmltcG9ydCB7IEZlZWQgfSBmcm9tICdvcGRzLWV4dHJhL2xpYi92MSc7XG5pbXBvcnQgeyBJUGFyc2VPcHRpb25zIH0gZnJvbSAndGEtanNvbi14JztcbmltcG9ydCB7IElUU1Jlc29sdmFibGUgfSBmcm9tICd0cy10eXBlJztcbmltcG9ydCBCbHVlYmlyZCBmcm9tICdibHVlYmlyZCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0TWFpbihqc29uOiBGZWVkLlRTVFlQRSwgb3B0aW9ucz86IElQYXJzZU9wdGlvbnMpXG57XG5cdHJldHVybiBPUERTVjEuRmVlZC5kZXNlcmlhbGl6ZShqc29uLCBvcHRpb25zKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkQXN5bmM8VCBleHRlbmRzIEZlZWQ+KGZlZWQ6IElUU1Jlc29sdmFibGU8VD4sIGZuczogKChmZWVkOiBUKSA9PiBJVFNSZXNvbHZhYmxlPFQ+KVtdKVxue1xuXHRyZXR1cm4gQmx1ZWJpcmQucmVzb2x2ZShmZWVkKVxuXHRcdC50aGVuKChmZWVkKSA9PiB7XG5cdFx0XHRyZXR1cm4gQmx1ZWJpcmQucmVzb2x2ZShmbnMpXG5cdFx0XHRcdC5yZWR1Y2UoKGZlZWQsIGZuKSA9PiB7XG5cdFx0XHRcdFx0cmV0dXJuIGZuKGZlZWQpXG5cdFx0XHRcdH0sIGZlZWQpXG5cdFx0fSlcblx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRTeW5jPFQgZXh0ZW5kcyBGZWVkPihmZWVkOiBULCBmbnM6ICgoZmVlZDogVCkgPT4gVClbXSlcbntcblx0cmV0dXJuIGZuc1xuXHRcdC5yZWR1Y2UoKGZlZWQsIGZuKSA9PiB7XG5cdFx0XHRyZXR1cm4gZm4oZmVlZClcblx0XHR9LCBmZWVkKVxuXHRcdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdE1haW5cblxuIl19