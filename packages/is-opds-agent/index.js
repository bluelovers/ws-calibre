"use strict";
/**
 * Created by user on 2020/1/27.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var EnumOPDSAgent;
(function (EnumOPDSAgent) {
    EnumOPDSAgent[EnumOPDSAgent["None"] = 0] = "None";
    EnumOPDSAgent[EnumOPDSAgent["OPDS"] = 1] = "OPDS";
    EnumOPDSAgent[EnumOPDSAgent["MoonPlusReader"] = 2] = "MoonPlusReader";
    EnumOPDSAgent[EnumOPDSAgent["Stanza"] = 4] = "Stanza";
    EnumOPDSAgent[EnumOPDSAgent["Aldiko"] = 8] = "Aldiko";
})(EnumOPDSAgent = exports.EnumOPDSAgent || (exports.EnumOPDSAgent = {}));
/**
 * this ua from Moon+ Reader
 */
exports.LAZY_OPDS_UA = `OPDS/Stanza iPhone/Aldiko/Moon+ Reader(Android)`;
function isOPDSAgent(ua) {
    let result = 0 /* None */;
    if (/Moon\+ Reader/i.test(ua)) {
        result |= 2 /* MoonPlusReader */;
    }
    if (/OPDS/i.test(ua)) {
        result |= 1 /* OPDS */;
    }
    if (/Stanza/i.test(ua)) {
        result |= 4 /* Stanza */;
    }
    if (/Aldiko/i.test(ua)) {
        result |= 8 /* Aldiko */;
    }
    return result;
}
exports.isOPDSAgent = isOPDSAgent;
function hasFlag(result, flag) {
    return Boolean(result & flag);
}
exports.hasFlag = hasFlag;
exports.default = isOPDSAgent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7O0FBRUgsSUFBa0IsYUFPakI7QUFQRCxXQUFrQixhQUFhO0lBRTlCLGlEQUFVLENBQUE7SUFDVixpREFBVSxDQUFBO0lBQ1YscUVBQW9CLENBQUE7SUFDcEIscURBQVksQ0FBQTtJQUNaLHFEQUFZLENBQUE7QUFDYixDQUFDLEVBUGlCLGFBQWEsR0FBYixxQkFBYSxLQUFiLHFCQUFhLFFBTzlCO0FBRUQ7O0dBRUc7QUFDVSxRQUFBLFlBQVksR0FBRyxpREFBaUQsQ0FBQztBQUU5RSxTQUFnQixXQUFXLENBQUMsRUFBVTtJQUVyQyxJQUFJLE1BQU0sZUFBcUIsQ0FBQztJQUVoQyxJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFDN0I7UUFDQyxNQUFNLDBCQUFnQyxDQUFBO0tBQ3RDO0lBRUQsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUNwQjtRQUNDLE1BQU0sZ0JBQXNCLENBQUE7S0FDNUI7SUFFRCxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQ3RCO1FBQ0MsTUFBTSxrQkFBd0IsQ0FBQTtLQUM5QjtJQUVELElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFDdEI7UUFDQyxNQUFNLGtCQUF3QixDQUFBO0tBQzlCO0lBRUQsT0FBTyxNQUFNLENBQUE7QUFDZCxDQUFDO0FBekJELGtDQXlCQztBQUVELFNBQWdCLE9BQU8sQ0FBQyxNQUE4QixFQUFFLElBQW1CO0lBRTFFLE9BQU8sT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQTtBQUM5QixDQUFDO0FBSEQsMEJBR0M7QUFFRCxrQkFBZSxXQUFXLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgdXNlciBvbiAyMDIwLzEvMjcuXG4gKi9cblxuZXhwb3J0IGNvbnN0IGVudW0gRW51bU9QRFNBZ2VudFxue1xuXHROb25lID0gMHgwLFxuXHRPUERTID0gMHgxLFxuXHRNb29uUGx1c1JlYWRlciA9IDB4Mixcblx0U3RhbnphID0gMHg0LFxuXHRBbGRpa28gPSAweDgsXG59XG5cbi8qKlxuICogdGhpcyB1YSBmcm9tIE1vb24rIFJlYWRlclxuICovXG5leHBvcnQgY29uc3QgTEFaWV9PUERTX1VBID0gYE9QRFMvU3RhbnphIGlQaG9uZS9BbGRpa28vTW9vbisgUmVhZGVyKEFuZHJvaWQpYDtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzT1BEU0FnZW50KHVhOiBzdHJpbmcpXG57XG5cdGxldCByZXN1bHQgPSBFbnVtT1BEU0FnZW50Lk5vbmU7XG5cblx0aWYgKC9Nb29uXFwrIFJlYWRlci9pLnRlc3QodWEpKVxuXHR7XG5cdFx0cmVzdWx0IHw9IEVudW1PUERTQWdlbnQuTW9vblBsdXNSZWFkZXJcblx0fVxuXG5cdGlmICgvT1BEUy9pLnRlc3QodWEpKVxuXHR7XG5cdFx0cmVzdWx0IHw9IEVudW1PUERTQWdlbnQuT1BEU1xuXHR9XG5cblx0aWYgKC9TdGFuemEvaS50ZXN0KHVhKSlcblx0e1xuXHRcdHJlc3VsdCB8PSBFbnVtT1BEU0FnZW50LlN0YW56YVxuXHR9XG5cblx0aWYgKC9BbGRpa28vaS50ZXN0KHVhKSlcblx0e1xuXHRcdHJlc3VsdCB8PSBFbnVtT1BEU0FnZW50LkFsZGlrb1xuXHR9XG5cblx0cmV0dXJuIHJlc3VsdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFzRmxhZyhyZXN1bHQ6IG51bWJlciB8IEVudW1PUERTQWdlbnQsIGZsYWc6IEVudW1PUERTQWdlbnQpXG57XG5cdHJldHVybiBCb29sZWFuKHJlc3VsdCAmIGZsYWcpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzT1BEU0FnZW50XG4iXX0=