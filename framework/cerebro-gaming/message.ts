
export enum MessageType
{
    Uknown = '',
    Connect = 'connect',
    Disconnect = 'disconnect'
}

class Header
{
    public type: MessageType.Uknown;
}

class Body
{
    public data: any;
}

export default class Message
{
    public readonly Header = Header;
    public readonly Body = Body;

    public headder: Header = new Header;
    public body: Body = new Body;
}