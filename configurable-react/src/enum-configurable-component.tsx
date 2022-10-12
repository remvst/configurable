import React from 'react';
import { EnumConfigurable } from '@remvst/configurable';
import { ComponentProps } from './component-props';

export default class EnumConfigurableComponent extends React.Component<ComponentProps<EnumConfigurable<any>>> {

    render() {
        const { configurable } = this.props;

        const value = configurable.read();
        let defaultValue = '';

        const mapping = new Map<string, any>();
        for (const category of configurable.categories) {
            for (const item of category.items) {
                mapping.set(item.key, item.value);
                if (item.value === value) {
                    defaultValue = item.key;
                }
            }
        }

        return (
            <select defaultValue={defaultValue} onChange={event => configurable.write(mapping.get(event.target.value))}>
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
