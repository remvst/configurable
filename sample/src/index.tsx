import { BooleanConfigurable, ButtonConfigurable, ColorConfigurable, CompositeConfigurable, GroupConfigurable, EnumConfigurable, NumberConfigurable, StringConfigurable } from '@remvst/configurable';
import { configurableToComponents, defaultComponents } from '@remvst/configurable-react';
import { TextureType } from '@remvst/configurable-react';
import { createRoot } from 'react-dom/client';
import './style.css';

let values = generateValues();

function generateValues() {
    return {
        'name': 'John Doe number ' + ~~(Math.random() * 100),
        'age': 12 + ~~(Math.random() * 80),
        'animal': 'doggy',
        'soul': Math.random() < 0.5,
        'color': ~~(Math.random() * 0xffffff),
        'children': ~~(Math.random() * 10),
        'firstborn': Math.random() < 0.5 ? 'Bobby' : 'Not Bobby',
        'id': '',
    };
}

const component = configurableToComponents({
    'configurable': () => {
        const animals = new EnumConfigurable<string>({
            'read': () => values.animal,
            'write': (x) => values.animal = x,
        });

        animals.category('Furry')
            .add('Dog', 'doggy')
            .add('Cat', 'cates');

        animals.category('Non-Furry')
            .add('Frog', 'froggy')
            .add('Worm', 'wormies')

        const betterAnimals = new EnumConfigurable<string>({
            'enumToken': 'animals',
            'read': () => values.animal,
            'write': (x) => values.animal = x,
        });
        betterAnimals.add('Kitten', 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Juvenile_Ragdoll.jpg');
        betterAnimals.add('Kitten2', 'https://weu-az-web-ca-cdn.azureedge.net/mediacontainer/medialibraries/mypetdoctor/images/blog-images/grey-kitten.webp?ext=.webp');

        return new CompositeConfigurable()
            .add('General info', new CompositeConfigurable()
                .add('Your age', new NumberConfigurable({
                    'read': () => values.age,
                    'write': (x) => values.age = x,
                    'step': 10,
                    'min': -100,
                    'max': 100,
                }))
                .add('Your name', new StringConfigurable({
                    'read': () => values.name,
                    'write': (x) => values.name = x,
                })))
            .add('Sell your soul?', new BooleanConfigurable({
                'read': () => values.soul,
                'write': (value) => values.soul = value,
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
                    'onClick': () => {},
                }))
                .add(animals)
                .add(betterAnimals)
            ))
        .add('Regen', new ButtonConfigurable({
            'label': 'Regenerate',
            'onClick': (configurable) => {
                values = generateValues();
                configurable.invalidate();
            },
        }))
    }, 
    'mapper': defaultComponents, 
    'getTexture': (token, item) => {
        if (token === 'animals') {
            return [item, TextureType.SINGLE];
        }
        return null;
    },
});

const root = createRoot(document.querySelector('div')!);
root.render(component);
