import React from 'react';
import { StringConfigurable } from '@remvst/configurable';
import { ComponentProps } from './component-props';

export default class StringConfigurableComponent extends React.Component<ComponentProps<StringConfigurable>> {
    render() {
        const { configurable } = this.props;
        return (<input 
            type="text" 
            defaultValue={configurable.read()}
            onBlur={event => configurable.write(event.target.value)} />);
    }
}
