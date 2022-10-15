import React from 'react';
import { ColorConfigurable } from '@remvst/configurable';
import InputComponent from './input-component';

export default class ColorConfigurableComponent extends InputComponent<number, ColorConfigurable> {
    protected mapValueToConfigurableFormat(value: string) {
        const parsed = parseInt(value.slice(1), 16);
        if (isNaN(parsed)) {
            throw new Error();
        }
        return parsed;
    }

    protected mapValueToInputFormat(value: number): string {
        return '#' + value.toString(16).padStart(6, '0');
    }

    render() {
        return (<input 
            type="color" 
            {...this.inputProperties} />);
    }
}
