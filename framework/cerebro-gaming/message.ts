import { CommandId } from "./command";

export class MessageHeader
{
    public type: CommandId;
}

export class MessageBody
{
    public data: string;
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
}