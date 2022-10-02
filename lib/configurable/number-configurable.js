"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const read_write_configurable_1 = require("./read-write-configurable");
class NumberConfigurable extends read_write_configurable_1.default {
    constructor(opts) {
        super(opts);
        this.opts = opts;
        this.min = 0;
        this.max = 100;
        this.step = 1;
    }
}
exports.default = NumberConfigurable;
