import NetworkId from "./network_id";
export declare enum MessageHeaderField {
    Action = "action",
    Command = "command",
    CommandPhase = "command_phase",
    Version = "version"
}
export declare class MessageHeader {
    id: NetworkId;
    fields: Map<string, string>;
    constructor();
}
export declare type MessageBody = string;
export default class Message {
    header: MessageHeader;
    body: MessageBody;
    constructor();
    static parse(data: string): Message;
}
