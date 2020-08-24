"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHtml = exports.isUrl = void 0;
function isUrl(input) {
    return /^http/.test(input);
}
exports.isUrl = isUrl;
function isHtml(input) {
    return /^<html/.test(input);
}
exports.isHtml = isHtml;
//# sourceMappingURL=utils.js.map