"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * remove extension from a file name
 * @param str string file name
 */
function removeExtension(str) {
    return str.split('.').slice(0, -1).join('.');
}
exports.removeExtension = removeExtension;
//# sourceMappingURL=helpers.js.map