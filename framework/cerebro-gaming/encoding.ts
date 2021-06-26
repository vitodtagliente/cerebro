
enum EncodingType {
    ASCII = 'ascii',
    Base64 = 'base64'
}

export default class Encoding {
    public static encode(data: string): string {
        let buffer: Buffer = Buffer.from(data);
        return buffer.toString(EncodingType.Base64);
    }

    public static decode(data: string): string {
        let buffer: Buffer = Buffer.from(data, EncodingType.Base64);
        return buffer.toString(EncodingType.ASCII);
    }
}