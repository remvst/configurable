export interface ComponentState<T> {
    readonly value: T;
    readonly dirty: boolean;
}
