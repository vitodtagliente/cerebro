
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

    public constructor()
    {
        this._data = new Map<K, TimeValue<V>>();
    }

    public set(key: K, value: V): void
    {

    }

    public has(key: K): boolean
    {

        return false;
    }

    public get(key: K): V
    {
        return null;
    }

    public delete(key: K): boolean
    {
        return true;
    }
}