import React from 'react';
import { NumberConfigurable } from '@remvst/configurable';
import { ComponentProps } from './component-props';

export default class NumberConfigurableComponent extends React.Component<ComponentProps<NumberConfigurable>> {
    render() {
        const { configurable } = this.props;
        return (<input 
            type="number" 
            defaultValue={configurable.read()} 
            step={configurable.step} 
            min={configurable.min} 
            max={configurable.max}
            onBlur={event => configurable.write(parseFloat(event.target.value))} />);
    }
}
