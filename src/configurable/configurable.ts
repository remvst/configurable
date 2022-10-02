export default class Configurable {
    onInvalidate: () => void = () => {};

    invalidate() {
        this.onInvalidate();
    }
}

