"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configurable_1 = require("./configurable");
class ButtonConfigurable extends configurable_1.default {
    constructor(opts) {
        super();
        this.label = opts.label;
        this.onClick = opts.onClick;
    }
}
exports.default = ButtonConfigurable;
