import { ReactElement } from 'react';
import { Configurable } from '@remvst/configurable';

export type ConfigurableToComponent = (
    configurable: Configurable, 
    mapper: ConfigurableToComponent,
) => ReactElement;
