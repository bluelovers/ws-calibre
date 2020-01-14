"use strict";
/**
 * Created by user on 2020/1/14.
 */
Object.defineProperty(exports, "__esModule", { value: true });
function compose(...fns) {
    const length = fns.length;
    return function processRow(row, index) {
        let i = 0;
        while (i < length) {
            const fn = fns[i++];
            row = fn(row, index);
        }
        return row;
    };
}
exports.compose = compose;
exports.default = compose;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9zZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbXBvc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOztBQUVILFNBQWdCLE9BQU8sQ0FBSSxHQUFHLEdBQXFDO0lBRWxFLE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7SUFDMUIsT0FBTyxTQUFTLFVBQVUsQ0FBQyxHQUFNLEVBQUUsS0FBYTtRQUUvQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDVixPQUFPLENBQUMsR0FBRyxNQUFNLEVBQ2pCO1lBQ0MsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEIsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDNUI7UUFDRCxPQUFPLEdBQVUsQ0FBQztJQUNuQixDQUFDLENBQUE7QUFDRixDQUFDO0FBYkQsMEJBYUM7QUFFRCxrQkFBZSxPQUFPLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgdXNlciBvbiAyMDIwLzEvMTQuXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBvc2U8VD4oLi4uZm5zOiAoKHJvdzogVCwgaW5kZXg6IG51bWJlcikgPT4gVClbXSlcbntcblx0Y29uc3QgbGVuZ3RoID0gZm5zLmxlbmd0aDtcblx0cmV0dXJuIGZ1bmN0aW9uIHByb2Nlc3NSb3cocm93OiBULCBpbmRleDogbnVtYmVyKTogVFxuXHR7XG5cdFx0bGV0IGkgPSAwO1xuXHRcdHdoaWxlIChpIDwgbGVuZ3RoKVxuXHRcdHtcblx0XHRcdGNvbnN0IGZuID0gZm5zW2krK107XG5cdFx0XHRyb3cgPSBmbihyb3cgYXMgYW55LCBpbmRleCk7XG5cdFx0fVxuXHRcdHJldHVybiByb3cgYXMgYW55O1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbXBvc2U7XG4iXX0=