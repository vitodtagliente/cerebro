declare type ExpireHandler<T> = (t: T) => void;
export default class TimeMap<K, V> {
    onExpire: ExpireHandler<V>;
    private _data;
    private _lifetime;
    private _tickTime;
    private _tickEach;
    constructor(lifetime?: number, tickEach?: number);
    set(key: K, value: V): void;
    has(key: K): boolean;
    get(key: K): V;
    delete(key: K): boolean;
    tick(): void;
    keys(): Array<K>;
}
export {};
