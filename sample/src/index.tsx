import { BooleanConfigurable, ColorConfigurable, CompositeConfigurable, Configurable, EnumConfigurable, NumberConfigurable, StringConfigurable } from '@remvst/configurable';
import { configurableToComponents, defaultComponents, ConfigurableToComponent } from '@remvst/configurable-react';
import { createRoot } from 'react-dom/client';
import './style.css';

const component = configurableToComponents(() => {

    const animals = new EnumConfigurable<string>({
        'read': () => 'doggy',
        'write': () => {},
    });

    animals.category('Furry')
        .add('Dog', 'doggy')
        .add('Cat', 'cates');

    animals.category('Non-Furry')
        .add('Frog', 'froggies')
        .add('Worm', 'wormies')

    return new CompositeConfigurable()
        .add('General info', new CompositeConfigurable()
            .add('Your age', new NumberConfigurable({
                'read': () => 12,
                'write': () => {},
                'step': 10,
            }))
            .add('Your name', new StringConfigurable({
                'read': () => 'John Doe',
                'write': () => {},
            })))
        .add('Sell your soul?', new BooleanConfigurable({
            'read': () => true,
            'write': (value, configurable) => {
                configurable.invalidate();
            },
        }))
        .add('Your favorite color?', new ColorConfigurable({
            'read': () => 0xffff00,
            'write': () => {},
        }))
        .add('Best animal?', animals)
        .add('Less general info', new CompositeConfigurable()
            .add('How many children?', new NumberConfigurable({
                'read': () => 12,
                'write': () => {},
            }))
            .add('Your firstborn name', new StringConfigurable({
                'read': () => 'Don Joe',
                'write': () => {},
            })))
});

const root = createRoot(document.querySelector('div')!);
root.render(component);
