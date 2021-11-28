export default class Encoding {
    static encode(data: string): string;
    static decode(data: string): string;
    static stringify(data: any): string;
    static parse<T>(data: string): T;
    static tryParse<T>(data: string): T;
}
