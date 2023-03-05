import React from 'react';
import { GroupConfigurable } from '@remvst/configurable';
import { ComponentProps } from './component-props';
import { ConfigurableToComponent } from './mapping';
import { TextureType } from './textured-enum-component';

interface Props extends ComponentProps<GroupConfigurable> {
    readonly mapper: ConfigurableToComponent;
    readonly getTexture?: (enumToken: any, item: any) => [string, TextureType] | null;
}

export default class CompositeConfigurableComponent extends React.Component<Props> {
    render() {
        const { configurable, mapper, getTexture } = this.props;

        const subComponents = configurable.entries.map((subConfigurable, i) => {
            return (
                <div key={i} className="group-configurable-item">
                    {mapper({'configurable': subConfigurable, mapper, getTexture})}
                </div>
            );
        });

        return (
            <div className="group-configurable">
                {subComponents}
            </div>
        );
    }
}
