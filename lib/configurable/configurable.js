"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Configurable {
    constructor() {
        this.onInvalidate = () => { };
    }
    invalidate() {
        this.onInvalidate();
    }
}
exports.default = Configurable;
