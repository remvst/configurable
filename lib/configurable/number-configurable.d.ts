import Configurable from "./configurable";
import ReadWriteConfigurable from "./read-write-configurable";
export default class NumberConfigurable extends ReadWriteConfigurable<number> {
    readonly opts: {
        readonly read: (configurable: Configurable) => number;
        readonly write: (value: number, configurable: Configurable) => void;
        readonly min?: number;
        readonly max?: number;
        readonly step?: number;
    };
    min: number;
    max: number;
    step: number;
    constructor(opts: {
        readonly read: (configurable: Configurable) => number;
        readonly write: (value: number, configurable: Configurable) => void;
        readonly min?: number;
        readonly max?: number;
        readonly step?: number;
    });
}
