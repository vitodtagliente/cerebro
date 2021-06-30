export type CommandId = string;

enum Version
{
    v1 = 1.0
}

export enum MessageHeaderField
{
    Version = 'version',
}

export class MessageHeader
{
    public constructor()
    {
        this.fields = new Map<string, string>();
        this.fields.set(MessageHeaderField.Version, Version.v1.toString());
    }

    public type: CommandId;
    public fields: Map<string, string>;
}

export class MessageBody
{
    public constructor()
    {
        this.data = new Map<string, string>();
    }

    public data: Map<string, string>;
}

export default class Message
{
    public constructor()
    {
        this.header = new MessageHeader;
        this.body = new MessageBody;
    }

    public header: MessageHeader;
    public body: MessageBody;

    // https://stackoverflow.com/questions/29085197/how-do-you-json-stringify-an-es6-map
    public static stringify(message: Message): string
    {
        function replacer(key, value)
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

        return JSON.stringify(message, replacer);
    }

    // https://stackoverflow.com/questions/29085197/how-do-you-json-stringify-an-es6-map
    public static parse(data: string): Message
    {
        function reviver(key, value)
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
}