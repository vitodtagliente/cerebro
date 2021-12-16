
class TimeValue<T>
{
    public value: T;
    public expiresAt: Date;

    public constructor(value: T, lifetime: number)
    {
        this.value = value;
        this.expiresAt = new Date(Date.now() + lifetime);
    }

    public get isExpired(): boolean
    {
        return new Date() > this.expiresAt;
    }
}

type ExpireHandler<T> = (t: T) => void;

export default class TimeMap<K, V>
{
    public onExpire: ExpireHandler<V> = (value: V) => { };

    private _data: Map<K, TimeValue<V>>;
    private _lifetime: number;
    private _tickTime: number;
    private _tickEach: number;

    public constructor(lifetime: number = 1000 /* millisec */, tickEach: number = 10000)
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
                this.onExpire(value.value);
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
                this.onExpire(value.value);
                this.delete(key);
            }
        }
    }

    public keys(): Array<K>
    {
        const keys: Array<K> = new Array<K>();
        for (const key of this._data.keys())
        {
            const value: TimeValue<V> = this._data.get(key);
            if (!value.isExpired)
            {
                keys.push(key);
            }
        }
        return keys;
    }
}