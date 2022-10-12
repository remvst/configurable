import Configurable from "./configurable";
import ReadWriteConfigurable from "./read-write-configurable";

export default class NumberConfigurable extends ReadWriteConfigurable<number> {

    min = 0;
    max = 100;
    step = 1;

    constructor(readonly opts: {
        readonly read: (configurable: Configurable) => number,
        readonly write: (value: number, configurable: Configurable) => void,
        readonly min?: number,
        readonly max?: number,
        readonly step?: number,
    }) {
        super(opts);
        this.min = opts.min || 0;
        this.max = opts.max || 100;
        this.step = opts.step || 1;
    }
}
