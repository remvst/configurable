import Configurable from "./configurable";

export default class GroupConfigurable extends Configurable {

    readonly entries: Configurable[] = [];

    add(configurable: Configurable): this {
        this.entries.push(configurable);
        configurable.onInvalidate = () => this.invalidate();
        return this;
    }
}
