import Configurable from './configurable';
export default class ReadWriteConfigurable<ValueType> extends Configurable {
    private readonly doRead;
    private readonly doWrite;
    constructor(opts: {
        readonly read: (configurable: Configurable) => ValueType;
        readonly write: (value: ValueType, configurable: Configurable) => void;
    });
    read(): ValueType;
    write(value: ValueType): void;
}
