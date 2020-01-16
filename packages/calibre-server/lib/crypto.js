"use strict";
/**
 * Created by user on 2020/1/14.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
function hash_sha1(input) {
    const shasum = crypto_1.default.createHash('sha1');
    shasum.update(input);
    return shasum.digest('hex').slice(0, 6);
}
exports.hash_sha1 = hash_sha1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3J5cHRvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3J5cHRvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7R0FFRzs7Ozs7QUFFSCxvREFBNEI7QUFFNUIsU0FBZ0IsU0FBUyxDQUFDLEtBQVU7SUFFbkMsTUFBTSxNQUFNLEdBQUcsZ0JBQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDekMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUN4QyxDQUFDO0FBTEQsOEJBS0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgdXNlciBvbiAyMDIwLzEvMTQuXG4gKi9cblxuaW1wb3J0IGNyeXB0byBmcm9tICdjcnlwdG8nO1xuXG5leHBvcnQgZnVuY3Rpb24gaGFzaF9zaGExKGlucHV0OiBhbnkpXG57XG5cdGNvbnN0IHNoYXN1bSA9IGNyeXB0by5jcmVhdGVIYXNoKCdzaGExJyk7XG5cdHNoYXN1bS51cGRhdGUoaW5wdXQpO1xuXHRyZXR1cm4gc2hhc3VtLmRpZ2VzdCgnaGV4Jykuc2xpY2UoMCwgNilcbn1cbiJdfQ==