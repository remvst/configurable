import React from "react";
import { Configurable } from '@remvst/configurable';
import { ConfigurableToComponent } from "./mapping";
import { TextureType } from "./textured-enum-component";

interface Props {
    readonly configurable: () => Configurable;
    readonly mapper: ConfigurableToComponent;
    readonly getTexture?: (enumToken: any, item: any) => ([string, TextureType] | null),
}

interface State {
    readonly configurable: Configurable;
    readonly refreshCount: number;
}

export default class InvalidatableComponent extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            'configurable': this.prepareConfigurable(),
            'refreshCount': 0,
        };
    }

    private renew() {
        const configurable = this.prepareConfigurable();
        this.setState({ configurable, 'refreshCount': this.state.refreshCount + 1 });
    }

    private prepareConfigurable(): Configurable {
        const configurable = this.props.configurable();
        configurable.onInvalidate = () => this.renew();
        return configurable;
    }

    render(): React.ReactNode {
        return (<div key={this.state.refreshCount}>
            {this.props.mapper({
                'configurable': this.state.configurable, 
                'mapper': this.props.mapper,
                'getTexture': this.props.getTexture,
            })}
        </div>);
    }
}
