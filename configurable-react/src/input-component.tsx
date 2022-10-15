import React from 'react';
import { ReadWriteConfigurable } from '@remvst/configurable';
import { ComponentProps } from './component-props';
import { ComponentState } from './component-state';

export default abstract class InputComponent<
    ConfigurableValueType,
    ConfigurableType extends ReadWriteConfigurable<ConfigurableValueType>,
> extends React.Component<
    ComponentProps<ConfigurableType>, 
    ComponentState<string>
> {
    constructor(props: ComponentProps<ConfigurableType>) {
        super(props);
        this.state = {
            'value': this.mapValueToInputFormat(props.configurable.read()),
            'dirty': false,
        };
    }

    protected abstract mapValueToConfigurableFormat(value: string): ConfigurableValueType;
    protected abstract mapValueToInputFormat(value: ConfigurableValueType): string;

    protected onChange(event: React.ChangeEvent<HTMLInputElement>, submit: boolean = false) {
        this.setState({'value': event.target.value, 'dirty': true}, () =>{
            if (submit) {
                this.submit();
            }
        });
    }

    protected onBlur(event: React.FocusEvent<HTMLInputElement>) {
        this.submit();
    }

    protected onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            (event.target as HTMLInputElement).blur();
        }
    }

    protected submit() {
        const { configurable } = this.props;
        const { value } = this.state;
        try {
            const parsed = this.mapValueToConfigurableFormat(value);
            configurable.write(parsed);
        } catch (e) {

        }

        this.setState({'value': this.mapValueToInputFormat(configurable.read()), 'dirty': false});
    }

    protected inputProperties(fastSubmit: boolean = false): React.InputHTMLAttributes<HTMLInputElement> {
        return {
            'className': this.state.dirty ? 'dirty' : '',
            'value': this.state.value,
            'onChange': (event) => this.onChange(event, fastSubmit),
            'onBlur': (event) => this.onBlur(event),
            'onKeyDown': (event) => this.onKeyDown(event),
        };
    }
}
