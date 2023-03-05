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
import TexturedEnumComponent, { TextureType } from './textured-enum-component';
import { ConfigurableToComponent } from './mapping';

export function defaultComponents(opts: {
    configurable: Configurable, 
    mapper: ConfigurableToComponent,
    getTexture?: (enumToken: any, item: any) => [string, TextureType] | null,
}): ReactElement {
    const { configurable, mapper } = opts;

    if (configurable instanceof CompositeConfigurable) {
        return (<CompositeConfigurableComponent configurable={configurable} mapper={mapper} getTexture={opts.getTexture} />);
    }
    if (configurable instanceof GroupConfigurable) {
        return (<GroupConfigurableComponent configurable={configurable} mapper={mapper} getTexture={opts.getTexture} />);
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
        if (configurable.enumToken) {
            return (<TexturedEnumComponent configurable={configurable} getTexture={opts.getTexture} />);
        }
        return (<EnumConfigurableComponent configurable={configurable} />);
    }
    if (configurable instanceof ButtonConfigurable) {
        return (<ButtonConfigurableComponent configurable={configurable} />);
    }
    throw new Error(`Unrecognized component type ${configurable.constructor.name}`);
}

export function configurableToComponents(opts: {
    configurable: () => Configurable,
    mapper: ConfigurableToComponent,
    getTexture?: (enumToken: any, item: any) => [string, TextureType] | null,
}) {
    return (
        <div className='configurable'>
            <InvalidatableComponent {...opts} />
        </div>
    );
}

export {
    CompositeConfigurableComponent,
    ConfigurableToComponent,
    TextureType,
}
