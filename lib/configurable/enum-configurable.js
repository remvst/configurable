"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const read_write_configurable_1 = require("./read-write-configurable");
class EnumConfigurable extends read_write_configurable_1.default {
    constructor(opts) {
        super(opts);
        this.items = [];
        if (opts.items) {
            for (const key of Object.keys(opts.items)) {
                this.items.push({ key, 'value': opts.items[key] });
            }
        }
    }
}
exports.default = EnumConfigurable;
