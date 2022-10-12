import React from 'react';
import { ButtonConfigurable } from '@remvst/configurable';
import { ComponentProps } from './component-props';

export default class ButtonConfigurableComponent extends React.Component<ComponentProps<ButtonConfigurable>> {
    render() {
        const { configurable } = this.props;
        return (<input
            type="button" 
            value={configurable.label}
            onClick={() => configurable.onClick(configurable)} />
        );
    }
}
