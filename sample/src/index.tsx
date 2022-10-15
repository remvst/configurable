import { BooleanConfigurable, ButtonConfigurable, ColorConfigurable, CompositeConfigurable, GroupConfigurable, EnumConfigurable, NumberConfigurable, StringConfigurable } from '@remvst/configurable';
import { configurableToComponents } from '@remvst/configurable-react';
import { createRoot } from 'react-dom/client';
import './style.css';

const values = {
    'name': 'John Doe',
    'age': 12,
    'animal': 'doggy',
    'soul': true,
    'color': 0xff00ff,
    'children': 3,
    'firstborn': 'Bobby',
    'id': '',
};

const component = configurableToComponents(() => {
    const animals = new EnumConfigurable<string>({
        'read': () => values.animal,
        'write': (x) => values.animal = x,
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
                'read': () => values.age,
                'write': (x) => {
                    console.log('write age');
                    values.age = x
                },
                'step': 10,
            }))
            .add('Your name', new StringConfigurable({
                'read': () => values.name,
                'write': (x) => values.name = x,
            })))
        .add('Sell your soul?', new BooleanConfigurable({
            'read': () => values.soul,
            'write': (value, configurable) => {
                values.soul = value;
                configurable.invalidate();
            },
        }))
        .add('Your favorite color?', new ColorConfigurable({
            'read': () => values.color,
            'write': (x) => values.color = x,
        }))
        .add('Best animal?', animals)
        .add('Less general info', new CompositeConfigurable()
            .add('How many children?', new NumberConfigurable({
                'read': () => values.children,
                'write': (x) => values.children = x,
            }))
            .add('Your firstborn name', new StringConfigurable({
                'read': () => values.firstborn,
                'write': (x) => values.firstborn = x,
            }))
        .add('ID', new GroupConfigurable()
            .add(new StringConfigurable({
                'read': () => values.id,
                'write': (x) => values.id = x,
            }))
            .add(new ButtonConfigurable({
                'label': 'Select',
                'onClick': () => alert('Congrats!'),
            }))
            .add(animals)
        )
        .add('Submit', new ButtonConfigurable({
            'label': 'Submit',
            'onClick': () => alert('Congrats!'),
        })))
});

const root = createRoot(document.querySelector('div')!);
root.render(component);
