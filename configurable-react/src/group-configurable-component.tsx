import React from 'react';
import { GroupConfigurable } from '@remvst/configurable';
import { ComponentProps } from './component-props';
import { ConfigurableToComponent } from './mapping';

interface Props extends ComponentProps<GroupConfigurable> {
    readonly mapper: ConfigurableToComponent;
}

export default class CompositeConfigurableComponent extends React.Component<Props> {
    render() {
        const { configurable, mapper } = this.props;

        const subComponents = configurable.entries.map((subConfigurable, i) => {
            return (
                <div key={i} className="group-configurable-item">
                    {mapper(subConfigurable, mapper)}
                </div>
            );
        });

        return (
            <div className="group-configurable">
                {subComponents}
            </div>
        );
    }
}
