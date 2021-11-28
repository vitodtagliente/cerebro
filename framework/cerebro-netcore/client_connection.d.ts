import Message from "./message";
import { NetworkProtocol } from "./network";
declare type ConnectionHandler = () => void;
declare type MessageHandler = (message: string) => void;
declare type ErrorHandler = (error: Error) => void;
export declare enum ClientConnectionState {
    Initialized = 0,
    Connected = 1,
    Closed = 2,
    Error = 3
}
export default abstract class ClientConnection {
    private _protocol;
    protected _state: ClientConnectionState;
    onConnection: ConnectionHandler;
    onDisconnection: ConnectionHandler;
    onMessage: MessageHandler;
    onError: ErrorHandler;
    constructor(protocol: NetworkProtocol);
    get protocol(): NetworkProtocol;
    get state(): ClientConnectionState;
    abstract connect(address: string, port: number): void;
    abstract close(): void;
    abstract send(message: any): void;
    abstract send(message: Message): void;
}
export {};
