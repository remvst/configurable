import ReadWriteConfigurable from '../../src/configurable/read-write-configurable';

describe('a read write configurable', () => {
    it('can read a value', () => {
        const read = jasmine.createSpy().and.returnValue('hey');
        
        const configurable = new ReadWriteConfigurable({
            read,
            write: () => {},
        });

        expect(configurable.read()).toBe('hey');
        expect(read).toHaveBeenCalledWith(configurable);
    });

    it('can write a value', () => {
        const write = jasmine.createSpy();
        
        const configurable = new ReadWriteConfigurable({
            read: () => 'heyyy',
            write,
        });

        configurable.write('value');
        expect(write).toHaveBeenCalledWith('value', configurable);
    });
});
