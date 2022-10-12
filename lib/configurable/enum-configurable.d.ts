import Configurable from "./configurable";
import ReadWriteConfigurable from "./read-write-configurable";
interface Item<T> {
    key: string;
    value: T;
}
export declare class EnumCategory<T> {
    readonly label: string | null;
    readonly items: Item<T>[];
    constructor(label: string | null);
    add(key: string, value: T): this;
}
export default class EnumConfigurable<T> extends ReadWriteConfigurable<T> {
    readonly defaultCategory: EnumCategory<T>;
    private readonly categoryMap;
    constructor(opts: {
        readonly items?: {
            [key: string]: T;
        };
        readonly read: (configurable: Configurable) => T;
        readonly write: (value: T, configurable: Configurable) => void;
    });
    add(key: string, value: T): this;
    get categories(): IterableIterator<EnumCategory<T>>;
    category(label: string): EnumCategory<T>;
}
export {};
