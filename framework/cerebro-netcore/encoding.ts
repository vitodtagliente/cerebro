
enum EncodingType
{
    ASCII = 'ascii',
    Base64 = 'base64'
}

export default class Encoding
{
    public static encode(data: string): string
    {
        let buffer: Buffer = Buffer.from(data);
        return buffer.toString(EncodingType.Base64);
    }

    public static decode(data: string): string
    {
        let buffer: Buffer = Buffer.from(data, EncodingType.Base64);
        return buffer.toString(EncodingType.ASCII);
    }

    // https://stackoverflow.com/questions/29085197/how-do-you-json-stringify-an-es6-map
    public static stringify(data: any): string
    {
        function replacer(key: string, value: any)
        {
            if (value instanceof Map)
            {
                return {
                    dataType: 'Map',
                    value: Array.from(value.entries()), // or with spread: value: [...value]
                };
            } else
            {
                return value;
            }
        }

        return JSON.stringify(data, replacer);
    }

    // https://stackoverflow.com/questions/29085197/how-do-you-json-stringify-an-es6-map
    public static parse<T>(data: string): T
    {
        function reviver(key: string, value: any)
        {
            if (typeof value === 'object' && value !== null)
            {
                if (value.dataType === 'Map')
                {
                    return new Map(value.value);
                }
            }
            return value;
        }

        return JSON.parse(data, reviver);
    }

    public static tryParse<T>(data: string): T
    {
        try
        {
            return Encoding.parse<T>(data);
        }
        catch
        {
            console.warn(`Failed to parse the data[${data}]`);
            return null;
        }
    }
}