import React from 'react';
import { StringConfigurable } from '@remvst/configurable';
import InputComponent from './input-component';

export default class StringConfigurableComponent extends InputComponent<string, StringConfigurable> {
    protected mapValueToConfigurableFormat(value: string): string {
        return value;
    }

    protected mapValueToInputFormat(value: string): string {
        return value;
    }

    render() {
        return (<input 
            type="text"
            {...this.inputProperties()} />);
    }
}
