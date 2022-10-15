import React from 'react';
import { BooleanConfigurable } from '@remvst/configurable';
import { ComponentProps } from './component-props';

export default class BooleanConfigurableComponent extends React.Component<ComponentProps<BooleanConfigurable>> {
    private onChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { configurable } = this.props;
        configurable.write(event.target.checked);
        this.forceUpdate();
        event.target.blur();
    }

    render() {
        const { configurable } = this.props;
        return (<input 
            type="checkbox" 
            checked={configurable.read()}
            onChange={(event) => this.onChange(event)} />);
    }
}
