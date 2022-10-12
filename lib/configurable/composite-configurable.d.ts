import Configurable from "./configurable";
interface Entry {
    key: string;
    configurable: Configurable;
}
export default class CompositeConfigurable extends Configurable {
    readonly entries: Entry[];
    add(key: string, configurable: Configurable): this;
}
export {};
