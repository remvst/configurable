"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configurable_1 = require("./configurable");
class ReadWriteConfigurable extends configurable_1.default {
    constructor(opts) {
        super();
        this.doRead = opts.read;
        this.doWrite = opts.write;
    }
    read() {
        return this.doRead(this);
    }
    write(value) {
        return this.doWrite(value, this);
    }
}
exports.default = ReadWriteConfigurable;
