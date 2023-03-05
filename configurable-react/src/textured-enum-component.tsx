import React, { useEffect, useState } from 'react';
import { EnumCategory, EnumConfigurable } from '@remvst/configurable';

export enum TextureType {
    TILED,
    SINGLE,
}

export default function TexturedEnumComponent<T>(props: {
    configurable: EnumConfigurable<T>, 
    getTexture?: (enumToken: any, item: T) => [string, TextureType] | null,
}) {
    const [currentValue, setCurrentValue] = useState(props.configurable.read());

    return (<div>
        {Array.from(props.configurable.categories).map(category => {
            return (
                <CategoryComponent
                    key={category.label}
                    category={category}
                    currentValue={currentValue}
                    getTexture={props.getTexture}
                    enumToken={props.configurable.enumToken}
                    onSelectValue={(value: T) => {
                        props.configurable.write(value);
                        setCurrentValue(value);
                    }} />
            );
        })}
    </div>)
}

function CategoryComponent<T>(props: {
    category: EnumCategory<T>
    currentValue: T,
    enumToken: any,
    getTexture?: (enumToken: any, item: T) => [string, TextureType] | null
    onSelectValue: (item: T) => void
}) {
    const items = props.category.items.map(item => {
        const texture = props.getTexture ? props.getTexture(props.enumToken, item.value) : null;

        return <TextureItemComponent
            key={item.key}
            title={item.key}
            src={texture ? texture[0] : null}
            textureType={texture ? texture[1] : null}
            enumToken={props.enumToken}
            selected={item.value === props.currentValue}
            onClick={() => props.onSelectValue(item.value)} />
    });

    return (<div className='group-configurable'>
        {items}
    </div>);
}

function TextureItemComponent(props: {
    title: string,
    src: string | null,
    textureType: TextureType | null,
    enumToken: any,
    selected: boolean,
    onClick: () => void,
}) {
    const [size, setSize] = useState({'width': 0, 'height': 0});

    useEffect(() => {
        if (size.width !== 0 || !props.src) { 
            return;
        }

        const img = new Image();
        img.onload = () => setSize({width: img.width, height: img.height});
        img.src = props.src;
    });

    let backgroundSize: string = 'contain';
    switch (props.textureType) {
    case TextureType.SINGLE: 
        backgroundSize = 'contain';
        break;
    case TextureType.TILED: 
        backgroundSize =`${size.width * 2}px ${size.height * 2}px`;
        break;
    }

    return (
        <div
            title={props.title}
            style={{
                'outline': props.selected ? '1px solid white' : 'none',
                'width': '20px', 
                'height': '20px', 
                'margin': '2px',
                'backgroundImage': props.src ? `url("${props.src}")` : 'none', 
                'backgroundRepeat': 'no-repeat',
                'backgroundPosition': 'center',
                'imageRendering': 'pixelated',
                backgroundSize,
            }}
            onClick={() => props.onClick()} />
    );
}

