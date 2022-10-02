import Configurable from "./configurable";
import ReadWriteConfigurable from "./read-write-configurable";
export default class NumberConfigurable extends ReadWriteConfigurable<number> {
    readonly opts: {
        readonly read: (configurable: Configurable) => number;
        readonly write: (value: number, configurable: Configurable) => void;
    };
    min: number;
    max: number;
    step: number;
    constructor(opts: {
        readonly read: (configurable: Configurable) => number;
        readonly write: (value: number, configurable: Configurable) => void;
    });
}
