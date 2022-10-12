import Configurable from './configurable';

export default class ButtonConfigurable extends Configurable {
    readonly label: string;
    readonly onClick: (configurable: ButtonConfigurable) => void;

    constructor(opts: {
        readonly label: string,
        readonly onClick: (configurable: ButtonConfigurable) => void,
    }) {
        super();
        this.label = opts.label;
        this.onClick = opts.onClick;
    }
}
