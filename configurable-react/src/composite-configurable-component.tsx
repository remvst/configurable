import React from 'react';
import { CompositeConfigurable } from '@remvst/configurable';
import { ComponentProps } from './component-props';
import { ConfigurableToComponent } from './mapping';
import { TextureType } from './textured-enum-component';

interface Props extends ComponentProps<CompositeConfigurable> {
    readonly mapper: ConfigurableToComponent;
    readonly getTexture?: (enumToken: any, item: any) => [string, TextureType] | null;
}

export default class CompositeConfigurableComponent extends React.Component<Props> {
    onClickLabel(event: React.MouseEvent) {
        ((event.target as HTMLElement).parentElement?.querySelector('input,select') as unknown as HTMLOrSVGElement)?.focus();
    }

    render() {
        const { configurable, mapper, getTexture } = this.props;

        const subComponents = configurable.entries.map(subConfigurable => {
            const id = `id-${Math.floor(Math.random() * 100000)}`;
            return (
                <div key={subConfigurable.key} className="composite-configurable-row">
                    <label onClick={event => this.onClickLabel(event)}>{subConfigurable.key}</label>
                    {mapper({'configurable': subConfigurable.configurable, mapper, getTexture})}
                </div>
            );
        });

        return (
            <div className="composite-configurable">
                {subComponents}
            </div>
        );
    }
}
