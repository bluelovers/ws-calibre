"use strict";
/**
 * Created by user on 2020/1/14.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var EnumBooksFilter;
(function (EnumBooksFilter) {
    EnumBooksFilter["tag"] = "tag";
    EnumBooksFilter["author"] = "author";
    EnumBooksFilter["series"] = "series";
})(EnumBooksFilter = exports.EnumBooksFilter || (exports.EnumBooksFilter = {}));
var EnumDataFormat;
(function (EnumDataFormat) {
    EnumDataFormat["EPUB"] = "EPUB";
})(EnumDataFormat = exports.EnumDataFormat || (exports.EnumDataFormat = {}));
var EnumDataFormatLowerCase;
(function (EnumDataFormatLowerCase) {
    EnumDataFormatLowerCase["EPUB"] = "epub";
})(EnumDataFormatLowerCase = exports.EnumDataFormatLowerCase || (exports.EnumDataFormatLowerCase = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0eXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7O0FBRUgsSUFBa0IsZUFLakI7QUFMRCxXQUFrQixlQUFlO0lBRWhDLDhCQUFXLENBQUE7SUFDWCxvQ0FBaUIsQ0FBQTtJQUNqQixvQ0FBaUIsQ0FBQTtBQUNsQixDQUFDLEVBTGlCLGVBQWUsR0FBZix1QkFBZSxLQUFmLHVCQUFlLFFBS2hDO0FBRUQsSUFBa0IsY0FHakI7QUFIRCxXQUFrQixjQUFjO0lBRS9CLCtCQUFhLENBQUE7QUFDZCxDQUFDLEVBSGlCLGNBQWMsR0FBZCxzQkFBYyxLQUFkLHNCQUFjLFFBRy9CO0FBRUQsSUFBa0IsdUJBR2pCO0FBSEQsV0FBa0IsdUJBQXVCO0lBRXhDLHdDQUFhLENBQUE7QUFDZCxDQUFDLEVBSGlCLHVCQUF1QixHQUF2QiwrQkFBdUIsS0FBdkIsK0JBQXVCLFFBR3hDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IHVzZXIgb24gMjAyMC8xLzE0LlxuICovXG5cbmV4cG9ydCBjb25zdCBlbnVtIEVudW1Cb29rc0ZpbHRlclxue1xuXHR0YWcgPSAndGFnJyxcblx0YXV0aG9yID0gJ2F1dGhvcicsXG5cdHNlcmllcyA9ICdzZXJpZXMnLFxufVxuXG5leHBvcnQgY29uc3QgZW51bSBFbnVtRGF0YUZvcm1hdFxue1xuXHRFUFVCID0gJ0VQVUInLFxufVxuXG5leHBvcnQgY29uc3QgZW51bSBFbnVtRGF0YUZvcm1hdExvd2VyQ2FzZVxue1xuXHRFUFVCID0gJ2VwdWInLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElCb29rQmFzZVxue1xuXHRib29rX2lkOiBzdHJpbmc7XG5cdGJvb2tfdGl0bGU6IHN0cmluZztcblx0Ym9va19zb3J0OiBzdHJpbmc7XG5cdGJvb2tfaGFzX2NvdmVyOiAnMScgfCB1bmRlZmluZWQ7XG5cdGJvb2tfcHViZGF0ZTogc3RyaW5nO1xuXHQvKipcblx0ICogZGlybmFtZVxuXHQgKi9cblx0Ym9va19wYXRoOiBzdHJpbmc7XG5cdGJvb2tfc2VyaWVzX2luZGV4OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUJvb2sgZXh0ZW5kcyBPbWl0PElCb29rQmFzZSwgJ2Jvb2tfaGFzX2NvdmVyJyB8ICdib29rX2lkJyB8ICdib29rX3Nlcmllc19pbmRleCc+XG57XG5cdGJvb2tfaWQ6IG51bWJlcjtcblx0Ym9va19oYXNfY292ZXI6IDEgfCAwO1xuXHRib29rX2lzYm46IHN0cmluZztcblx0Ym9va19zZXJpZXNfaW5kZXg6IG51bWJlcjtcblx0Y29tbWVudDogc3RyaW5nO1xuXHR0YWdzOiBJVGFnQmFzZVtdO1xuXHRhdXRob3JzOiBJQXV0aG9yQmFzZVtdO1xuXHRzZXJpZXM6IElTZXJpZXNCYXNlW107XG5cdGRhdGE6IElCb29rRmlsZVtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElCb29rRmlsZVxue1xuXHRkYXRhX2lkOiBzdHJpbmc7XG5cdGRhdGFfZm9ybWF0OiBzdHJpbmcgfCBFbnVtRGF0YUZvcm1hdDtcblx0ZGF0YV9zaXplOiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBmaWxlIG5hbWVcblx0ICovXG5cdGRhdGFfbmFtZTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElUYWdCYXNlXG57XG5cdHRhZ19uYW1lOiBzdHJpbmc7XG5cdHRhZ19pZDogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElUYWcgZXh0ZW5kcyBJVGFnQmFzZVxue1xuXHR0YWdfYm9va3NfY291bnQ6IG51bWJlcjtcblx0Ym9va3M6IElCb29rQmFzZVtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElTZXJpZXNCYXNlXG57XG5cdHNlcmllc19pZDogbnVtYmVyO1xuXHRzZXJpZXNfbmFtZTogc3RyaW5nO1xuXHRzZXJpZXNfc29ydDogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElTZXJpZXMgZXh0ZW5kcyBJU2VyaWVzQmFzZVxue1xuXHRib29rczogSUJvb2tCYXNlW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUF1dGhvckJhc2Vcbntcblx0YXV0aG9yX2lkOiBudW1iZXI7XG5cdGF1dGhvcl9uYW1lOiBzdHJpbmc7XG5cdGF1dGhvcl9zb3J0OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUF1dGhvciBleHRlbmRzIElBdXRob3JCYXNlXG57XG5cdGF1dGhvcnNfYm9va3NfY291bnQ6IG51bWJlcjtcblx0Ym9va3M6IElCb29rQmFzZVtdO1xuXHRzZXJpZXM6IElTZXJpZXNCYXNlW107XG59XG4iXX0=