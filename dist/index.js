"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gist_encoder_1 = require("./encoders/gist.encoder");
const csv_encoder_1 = require("./encoders/csv.encoder");
exports.default = {
    install(Vue, opts) {
        // encoders
        Vue.use(gist_encoder_1.default);
        Vue.use(csv_encoder_1.default);
    }
};
//# sourceMappingURL=index.js.map