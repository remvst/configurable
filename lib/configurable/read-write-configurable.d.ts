import Configurable from './configurable';
export default class ReadWriteConfigurable<ValueType> extends Configurable {
    private readonly read;
    private readonly write;
    constructor(opts: {
        readonly read: (configurable: Configurable) => ValueType;
        readonly write: (value: ValueType, configurable: Configurable) => void;
    });
}
