import Configurable from './configurable';

export default class ReadWriteConfigurable<ValueType> extends Configurable {

    private readonly doRead: (configurable: Configurable) => ValueType;
    private readonly doWrite: (value: ValueType, configurable: Configurable) => void;

    constructor(opts: {
        readonly read: (configurable: Configurable) => ValueType,
        readonly write: (value: ValueType, configurable: Configurable) => void,
    }) {
        super();

        this.doRead = opts.read;
        this.doWrite = opts.write;
    }

    read(): ValueType {
        return this.doRead(this as Configurable);
    }

    write(value: ValueType) {
        return this.doWrite(value, this as Configurable);
    }
}
