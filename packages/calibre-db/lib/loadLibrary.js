"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = __importDefault(require("./DB"));
function loadLibrary(row) {
    return DB_1.default(row.name, row._fullpath);
}
exports.loadLibrary = loadLibrary;
exports.default = loadLibrary;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZExpYnJhcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsb2FkTGlicmFyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDhDQUFvQztBQUdwQyxTQUFnQixXQUFXLENBQUMsR0FHM0I7SUFFQSxPQUFPLFlBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMxQyxDQUFDO0FBTkQsa0NBTUM7QUFFRCxrQkFBZSxXQUFXLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY3JlYXRlREIsIHsgREIgfSBmcm9tICcuL0RCJztcbmltcG9ydCBCbHVlYmlyZCBmcm9tICdibHVlYmlyZCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkTGlicmFyeShyb3c6IHtcblx0bmFtZTogc3RyaW5nO1xuXHRfZnVsbHBhdGg6IHN0cmluZztcbn0pXG57XG5cdHJldHVybiBjcmVhdGVEQihyb3cubmFtZSwgcm93Ll9mdWxscGF0aCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGxvYWRMaWJyYXJ5XG4iXX0=