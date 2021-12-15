export default class NetMap extends Map<string, string> {
    insert(key: string, value: any): NetMap;
    as<T>(key: string): T;
    asBool(key: string): boolean;
    asNumber(key: string): number;
}
