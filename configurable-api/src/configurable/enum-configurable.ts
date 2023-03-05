import Configurable from "./configurable";
import ReadWriteConfigurable from "./read-write-configurable";

interface Item<T> {
    key: string;
    value: T;
}

export class EnumCategory<T> {
    readonly items: Item<T>[] = [];

    constructor(
        readonly label: string | null,
    ) {

    }

    add(key: string, value: T): this {
        this.items.push({key, value});
        return this;
    }
}

export default class EnumConfigurable<T> extends ReadWriteConfigurable<T> {

    readonly defaultCategory = new EnumCategory<T>(null);
    private readonly categoryMap: Map<string, EnumCategory<T>> = new Map();
    readonly enumToken: any;

    constructor(opts: {
        readonly enumToken?: any,
        readonly items?: {[key: string]: T},
        readonly read: (configurable: Configurable) => T,
        readonly write: (value: T, configurable: Configurable) => void,
    }) {
        super(opts);

        this.enumToken = opts.enumToken || null;

        this.categoryMap.set('default', this.defaultCategory);

        if (opts.items){
            for (const key of Object.keys(opts.items)) {
                this.add(key, opts.items[key]);
            }
        }
    }

    add(key: string, value: T): this {
        this.category('default').add(key, value);
        return this;
    }

    addItems(
        items: Iterable<T>,
        itemLabel: (item: T) => string,
        category: (item: T) => string | null = () => null,
    ): this {
        for (const item of items) {
            const categoryLabel = category(item);
            const itemCategory = categoryLabel ? this.category(categoryLabel) : this.defaultCategory;
            itemCategory.add(itemLabel(item), item);
        }
        return this;
    }

    get categories() {
        return this.categoryMap.values();
    }

    category(label: string): EnumCategory<T> {
        if (!this.categoryMap.has(label)) {
            const category = new EnumCategory<T>(label);
            this.categoryMap.set(label, category);
        }
        return this.categoryMap.get(label)!;
    }
}
