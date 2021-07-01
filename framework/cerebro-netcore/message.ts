import NetworkId, { nextNetworkId } from "./network_id";

enum Version
{
    v1 = 1.0
}

export enum MessageHeaderField
{
    Version = 'version',
    Command = 'command'
}

export class MessageHeader
{
    public constructor()
    {
        this.id = nextNetworkId()
        this.fields = new Map<string, string>();
        this.fields.set(MessageHeaderField.Version, Version.v1.toString());
    }

    public id: NetworkId;
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