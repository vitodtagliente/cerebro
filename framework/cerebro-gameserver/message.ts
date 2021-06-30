import { CommandId } from "./command";

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

export type MessageBody = string;

export default class Message
{
    public constructor()
    {
        this.header = new MessageHeader;
    }

    public header: MessageHeader;
    public body: MessageBody;
}