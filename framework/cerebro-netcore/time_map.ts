
class TimeValue<T>
{
    public value: T;
    public expiresAt: number;

    public constructor(value: T, lifetime: number)
    {
        this.value = value;

    }
}

export default class TimeMap<K, V>
{
    private _data: Map<K, TimeValue<V>>;
    private _lifetime: number;

    public constructor(lifetime: number = 1000)
    {
        this._data = new Map<K, TimeValue<V>>();
        this._lifetime = lifetime;
    }

    public set(key: K, value: V): void
    {
        this._data.set(key, new TimeValue<V>(value, this._lifetime));
    }

    public has(key: K): boolean
    {
        return this._data.has(key);
    }

    public get(key: K): V
    {
        const value: TimeValue<V> = this._data.get(key);
        if (value)
        {
            return value.value;
        }
        return null;
    }

    public delete(key: K): boolean
    {
        return this._data.delete(key);
    }
}