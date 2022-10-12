import { Configurable } from '@remvst/configurable';

export interface ComponentProps<T extends Configurable> {
    readonly configurable: T;
}
