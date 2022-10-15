import Configurable from "./configurable";
import ReadWriteConfigurable from "./read-write-configurable";

export default class NumberConfigurable extends ReadWriteConfigurable<number> {

    min: number | undefined;
    max: number | undefined;
    step = 1;

    constructor(readonly opts: {
        readonly read: (configurable: Configurable) => number,
        readonly write: (value: number, configurable: Configurable) => void,
        readonly min?: number,
        readonly max?: number,
        readonly step?: number,
    }) {
        super(opts);
        this.min = opts.min;
        this.max = opts.max;
        this.step = opts.step || 1;
    }
}
