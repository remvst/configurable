import React from "react";
import { ComponentProps } from "./component-props";

import { Configurable } from '@remvst/configurable';
import { ConfigurableToComponent } from "./mapping";

interface Props {
    readonly configurable: () => Configurable;
    readonly mapper: ConfigurableToComponent;
}

interface State {
    readonly configurable: Configurable;
}

export default class InvalidatableComponent extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            'configurable': this.prepareConfigurable(),
        };
    }

    private renew() {
        const configurable = this.prepareConfigurable();
        this.setState({ configurable });
    }

    private prepareConfigurable(): Configurable {
        const configurable = this.props.configurable();
        configurable.onInvalidate = () => this.renew();
        return configurable;
    }

    render(): React.ReactNode {
        return (<div>{this.props.mapper(this.state.configurable, this.props.mapper)}</div>);
    }
}
