import { Encoding } from ".";

export default class NetMap extends Map<string, string>
{
    public insert(key: string, value: any): NetMap
    {
        this.set(key, Encoding.stringify(value));
        return this;
    }

    public as<T>(key: string): T
    {
        return Encoding.tryParse<T>(this.get(key));
    }

    public asBool(key: string): boolean
    {
        return this.as<boolean>(key);
    }

    public asNumber(key: string): number
    {
        return this.as<number>(key);
    }
}