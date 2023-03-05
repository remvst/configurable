import { ReactElement } from 'react';
import { Configurable } from '@remvst/configurable';
import { TextureType } from './textured-enum-component';

export type ConfigurableToComponent = (opts: {
    configurable: Configurable, 
    mapper: ConfigurableToComponent,
    getTexture?: (enumToken: any, item: any) => [string, TextureType] | null,
}) => ReactElement;
