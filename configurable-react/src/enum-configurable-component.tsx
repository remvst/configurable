import React from 'react';
import { EnumConfigurable } from '@remvst/configurable';
import { ComponentProps } from './component-props';

export default class EnumConfigurableComponent extends React.Component<ComponentProps<EnumConfigurable<any>>> {

    private onChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const { configurable } = this.props;
        const { mapping } = this;
        configurable.write(mapping.get(event.target.value));
        event.target.blur();
    }

    private get mapping(): Map<string, any> {
        const { configurable } = this.props;
        const mapping = new Map<string, any>();
        for (const category of configurable.categories) {
            for (const item of category.items) {
                mapping.set(item.key, item.value);
            }
        }
        return mapping;
    }

    render() {
        const { configurable } = this.props;

        const configurableValue = configurable.read();
        const { mapping } = this;

        let defaultValue = '';
        for (const [key, value] of mapping) {
            if (value === configurableValue) {
                defaultValue = key;
            }
        }

        return (
            <select defaultValue={defaultValue} onChange={(e) => this.onChange(e)}>
                {Array.from(configurable.categories).map((category) => {
                    return (<optgroup label={category.label || ''} key={category.label}>
                        {category.items.map((item) => {
                            return (
                                <option key={item.key} value={item.key}>{item.key}</option>
                            );
                        })}
                    </optgroup>);
                })}
            </select>
        )
    }
}
