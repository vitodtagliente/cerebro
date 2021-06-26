
export enum MessageType
{
    Uknown = '',
    Connect = 'connect',
    Disconnect = 'disconnect'
}

export class MessageHeader
{
    public type: MessageType.Uknown;
}

export class MessageBody
{
    public data: any;
}

export default class Message
{
    public constructor()
    {
        this.headder = new MessageHeader;
        this.body = new MessageBody;
    }

    public headder: MessageHeader;
    public body: MessageBody;
}