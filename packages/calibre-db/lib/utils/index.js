"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fileext_1 = __importDefault(require("./fileext"));
function strip001(v) {
    return v.replace(/'/g, '\\\'');
}
exports.strip001 = strip001;
function getFilePath(file, book) {
    return [encodeURI(book.book_path), encodeURIComponent(strip001(file.data_name))].join('/') + fileext_1.default(file.data_format);
}
exports.getFilePath = getFilePath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUlBLHdEQUFnQztBQUVoQyxTQUFnQixRQUFRLENBQUMsQ0FBUztJQUVqQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQzlCLENBQUM7QUFIRCw0QkFHQztBQUVELFNBQWdCLFdBQVcsQ0FBQyxJQUFlLEVBQUcsSUFBVztJQUV4RCxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsaUJBQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7QUFDdkgsQ0FBQztBQUhELGtDQUdDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IHVzZXIgb24gMjAyMC8xLzE0LlxuICovXG5pbXBvcnQgeyBJQm9vaywgSUJvb2tGaWxlIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IGZpbGVleHQgZnJvbSAnLi9maWxlZXh0JztcblxuZXhwb3J0IGZ1bmN0aW9uIHN0cmlwMDAxKHY6IHN0cmluZylcbntcblx0cmV0dXJuIHYucmVwbGFjZSgvJy9nLCdcXFxcXFwnJylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEZpbGVQYXRoKGZpbGU6IElCb29rRmlsZSAsIGJvb2s6IElCb29rKVxue1xuXHRyZXR1cm4gW2VuY29kZVVSSShib29rLmJvb2tfcGF0aCksIGVuY29kZVVSSUNvbXBvbmVudChzdHJpcDAwMShmaWxlLmRhdGFfbmFtZSkpXS5qb2luKCcvJykgKyBmaWxlZXh0KGZpbGUuZGF0YV9mb3JtYXQpXG59XG4iXX0=