"use strict";
/**
 * Created by user on 2020/1/27.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasFlag = exports.isOPDSAgent = exports.LAZY_OPDS_UA = exports.EnumOPDSAgent = void 0;
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
//# sourceMappingURL=index.js.map