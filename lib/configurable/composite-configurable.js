"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configurable_1 = require("./configurable");
class CompositeConfigurable extends configurable_1.default {
    constructor() {
        super(...arguments);
        this.entries = [];
    }
    add(key, configurable) {
        this.entries.push({
            key,
            configurable,
        });
        return this;
    }
}
exports.default = CompositeConfigurable;
