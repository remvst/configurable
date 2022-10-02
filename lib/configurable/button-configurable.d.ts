import Configurable from './configurable';
export default class ButtonConfigurable extends Configurable {
    readonly label: string;
    readonly onClick: (configurable: ButtonConfigurable) => void;
    constructor(opts: {
        readonly label: string;
        readonly onClick: (configurable: ButtonConfigurable) => void;
    });
}
