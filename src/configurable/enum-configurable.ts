import Configurable from "./configurable";
import ReadWriteConfigurable from "./read-write-configurable";

interface Entry<T> {
    key: string;
    value: T;
}

export default class EnumConfigurable<T> extends ReadWriteConfigurable<T> {

    readonly items: Entry<T>[] = [];

    constructor(opts: {
        readonly items?: {[key: string]: T},
        readonly read: (configurable: Configurable) => T,
        readonly write: (value: T, configurable: Configurable) => void,
    }) {
        super(opts);

        if (opts.items){
            for (const key of Object.keys(opts.items)) {
                this.items.push({key, 'value': opts.items[key]});
            }
        }
    }
}
