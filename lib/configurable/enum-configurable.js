"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumCategory = void 0;
const read_write_configurable_1 = require("./read-write-configurable");
class EnumCategory {
    constructor(label) {
        this.label = label;
        this.items = [];
    }
    add(key, value) {
        this.items.push({ key, value });
        return this;
    }
}
exports.EnumCategory = EnumCategory;
class EnumConfigurable extends read_write_configurable_1.default {
    constructor(opts) {
        super(opts);
        this.defaultCategory = new EnumCategory(null);
        this.categoryMap = new Map();
        this.categoryMap.set('default', this.defaultCategory);
        if (opts.items) {
            for (const key of Object.keys(opts.items)) {
                this.add(key, opts.items[key]);
            }
        }
    }
    add(key, value) {
        this.category('default').add(key, value);
        return this;
    }
    get categories() {
        return this.categoryMap.values();
    }
    category(label) {
        if (!this.categoryMap.has(label)) {
            const category = new EnumCategory(label);
            this.categoryMap.set(label, category);
        }
        return this.categoryMap.get(label);
    }
}
exports.default = EnumConfigurable;
