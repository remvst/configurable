import React from 'react';
import { ColorConfigurable } from '@remvst/configurable';
import { ComponentProps } from './component-props';

export function leftPad(s: string, pad: string, length: number): string {
    while (s.length < length) {
        s = pad + s;
    }
    return s;
}

export default class ColorConfigurableComponent extends React.Component<ComponentProps<ColorConfigurable>> {
    render() {
        const { configurable } = this.props;
        const colorAsHex = '#' + configurable.read().toString(16).padStart(6, '0');
        return (<input 
            type="color" 
            defaultValue={colorAsHex}
            onBlur={event => configurable.write(parseInt(event.target.value.slice(1), 16))} />);
    }
}
