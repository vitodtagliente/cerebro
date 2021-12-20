import Encoding from "./encoding";
import NetworkId, { nextNetworkId } from "./network_id";

enum Version
{
    v1 = 1.0
}

export enum MessageHeaderField
{
    Rpc = 'rpc',
    RpcPhase = 'rpc_phase',
    Version = 'version',
}

export class MessageHeader
{
    public id: NetworkId;
    public fields: Map<string, string>;

    public constructor()
    {
        this.id = nextNetworkId()
        this.fields = new Map<string, string>();
        this.fields.set(MessageHeaderField.Version, Version.v1.toString());
    }
}

export type MessageBody = string;

export default class Message
{
    public header: MessageHeader;
    public body: MessageBody;

    public constructor()
    {
        this.header = new MessageHeader;
    }

    public static parse(data: string): Message
    {
        try
        {
            return Encoding.parse<Message>(data);
        }
        catch
        {
            console.warn(`Failed to parse the message[${data}]`);
            return null;
        }
    }
}