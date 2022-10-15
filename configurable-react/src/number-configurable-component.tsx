import React from 'react';
import { NumberConfigurable } from '@remvst/configurable';
import InputComponent from './input-component';

export default class NumberConfigurableComponent extends InputComponent<number, NumberConfigurable> {
    protected mapValueToConfigurableFormat(value: string) {
        const parsed = parseFloat(value);
        if (isNaN(parsed)) {
            throw new Error();
        }
        return parsed;
    }

    protected mapValueToInputFormat(value: number): string {
        return value.toString();
    }

    render() {
        const { configurable } = this.props;
        return (<input 
            type="number" 
            step={configurable.step} 
            min={configurable.min} 
            max={configurable.max}
            {...this.inputProperties} />);
    }
}
