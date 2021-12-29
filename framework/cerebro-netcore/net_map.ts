import { Encoding } from ".";
import NetworkId, { InvalidNetworkId } from "./network_id";

export default class NetMap extends Map<string, string>
{
    public insert(key: string, value: any): NetMap
    {
        this.set(key, Encoding.stringify(value));
        return this;
    }

    public as<T>(key: string): T
    {
        if (this.has(key))
            return Encoding.tryParse<T>(this.get(key));
        return null;
    }

    public asBool(key: string): boolean
    {
        const value: boolean = this.as<boolean>(key);
        if (value) return value;
        return false;
    }

    public asNumber(key: string): number
    {
        const value: number = this.as<number>(key);
        if (value) return value;
        return 0;
    }

    public asString(key: string): string
    {
        const value: string = this.as<string>(key);
        if (value) return value.slice(1, -1);
        return '';
    }

    public asNetworkId(key: string): NetworkId
    {
        const value: NetworkId = this.as<string>(key);
        if (value) return value;
        return InvalidNetworkId;
    }

    public clone(): NetMap
    {
        const map: NetMap = new NetMap;
        for (const [key, value] of this)
        {
            this.insert(key, value);
        }
        return map;
    }

    public copy(map: NetMap): void
    {
        this.clear();
        for (const [key, value] of map)
        {
            this.insert(key, value);
        }
    }
}