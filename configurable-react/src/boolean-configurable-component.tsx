import React from 'react';
import { BooleanConfigurable } from '@remvst/configurable';
import { ComponentProps } from './component-props';

export default class BooleanConfigurableComponent extends React.Component<ComponentProps<BooleanConfigurable>> {
    render() {
        const { configurable } = this.props;
        return (<input 
            type="checkbox" 
            defaultChecked={configurable.read()}
            onChange={(event) => configurable.write(event.target.checked)} />);
    }
}
