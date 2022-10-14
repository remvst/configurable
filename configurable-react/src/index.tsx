import React, { ReactElement } from 'react';
import { BooleanConfigurable, ButtonConfigurable, ColorConfigurable, CompositeConfigurable, Configurable, EnumConfigurable, NumberConfigurable, StringConfigurable, GroupConfigurable } from '@remvst/configurable';
import CompositeConfigurableComponent from './composite-configurable-component';
import NumberConfigurableComponent from './number-configurable-component';
import StringConfigurableComponent from './string-configurable-component';
import BooleanConfigurableComponent from './boolean-configurable-component';
import ColorConfigurableComponent from './color-configurable-component';
import EnumConfigurableComponent from './enum-configurable-component';
import ButtonConfigurableComponent from './button-configurable-component';
import GroupConfigurableComponent from './group-configurable-component';
import InvalidatableComponent from './invalidatable-component';
import { ConfigurableToComponent } from './mapping';

export function defaultComponents(configurable: Configurable, mapper: ConfigurableToComponent): ReactElement {
    if (configurable instanceof CompositeConfigurable) {
        return (<CompositeConfigurableComponent configurable={configurable} mapper={mapper} />);
    }
    if (configurable instanceof GroupConfigurable) {
        return (<GroupConfigurableComponent configurable={configurable} mapper={mapper} />);
    }
    if (configurable instanceof ColorConfigurable) {
        return (<ColorConfigurableComponent configurable={configurable} />);
    }
    if (configurable instanceof NumberConfigurable) {
        return (<NumberConfigurableComponent configurable={configurable} />);
    }
    if (configurable instanceof StringConfigurable) {
        return (<StringConfigurableComponent configurable={configurable} />);
    }
    if (configurable instanceof BooleanConfigurable) {
        return (<BooleanConfigurableComponent configurable={configurable} />);
    }
    if (configurable instanceof EnumConfigurable) {
        return (<EnumConfigurableComponent configurable={configurable} />);
    }
    if (configurable instanceof ButtonConfigurable) {
        return (<ButtonConfigurableComponent configurable={configurable} />);
    }
    console.log(GroupConfigurable, configurable.constructor, GroupConfigurable === configurable.constructor)
    throw new Error(`Unrecognized component type ${configurable.constructor.name}`);
}

export function configurableToComponents(
    configurable: () => Configurable,
    mapper: ConfigurableToComponent = defaultComponents,
) {
    return <InvalidatableComponent configurable={configurable} mapper={mapper} />;
}

export {
    CompositeConfigurableComponent,
    ConfigurableToComponent,
}
