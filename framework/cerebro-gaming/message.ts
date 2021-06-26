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
        this.headder = new MessageHeader;
        this.body = new MessageBody;
    }

    public headder: MessageHeader;
    public body: MessageBody;
}