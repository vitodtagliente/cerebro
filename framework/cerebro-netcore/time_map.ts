
class TimeValue<T>
{
    public value: T;
    public expiresAt: number;

    public constructor(value: T, lifetime: number)
    {
        this.value = value;
        this.expiresAt = new Date(Date.now() + lifetime).getTime();
    }

    public get isExpired(): boolean
    {
        // const now: number = Date.now();
        // return now > this.expiresAt;
        return false;
    }
}

export default class TimeMap<K, V>
{
    private _data: Map<K, TimeValue<V>>;
    private _lifetime: number;
    private _tickTime: number;
    private _tickEach: number;

    public constructor(lifetime: number = 1000, tickEach: number = 10000)
    {
        this._data = new Map<K, TimeValue<V>>();
        this._lifetime = lifetime;
        this._tickTime = Date.now();
        this._tickEach = tickEach;
    }

    public set(key: K, value: V): void
    {
        this._data.set(key, new TimeValue<V>(value, this._lifetime));
    }

    public has(key: K): boolean
    {
        const value: TimeValue<V> = this._data.get(key);
        if (value)
        {
            if (value.isExpired)
            {
                this.delete(key);
                return false;
            }
            return true;
        }
        return false;
    }

    public get(key: K): V
    {
        const value: TimeValue<V> = this._data.get(key);
        if (value)
        {
            if (value.isExpired)
            {
                this.delete(key);
                return null;
            }
            return value.value;
        }
        return null;
    }

    public delete(key: K): boolean
    {
        return this._data.delete(key);
    }

    public tick(): void
    {
        if ((Date.now() - this._tickTime) < this._tickEach)
        {
            return;
        }

        this._tickTime = Date.now();

        for (const key of this._data.keys())
        {
            const value: TimeValue<V> = this._data.get(key);
            if (value.isExpired)
            {
                this.delete(key);
            }
        }
    }
}