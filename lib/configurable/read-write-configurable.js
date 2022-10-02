"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configurable_1 = require("./configurable");
class ReadWriteConfigurable extends configurable_1.default {
    constructor(opts) {
        super();
        this.read = opts.read;
        this.write = opts.write;
    }
}
exports.default = ReadWriteConfigurable;
