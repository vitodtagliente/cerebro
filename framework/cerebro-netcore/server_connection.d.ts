import Message from "./message";
import { NetworkProtocol, SocketId } from "./network";
declare type ClientConnectionHandler = (socketId: SocketId) => void;
declare type ClientMessageHandler = (socketId: SocketId, message: string) => void;
declare type ErrorHandler = (error: Error) => void;
declare type ListeningHandler = () => void;
export declare enum ServerConnectionState {
    Initialized = 0,
    Listening = 1,
    Error = 2
}
export default abstract class ServerConnection {
    private _protocol;
    protected _state: ServerConnectionState;
    onClientConnection: ClientConnectionHandler;
    onClientDisconnection: ClientConnectionHandler;
    onClientMessage: ClientMessageHandler;
    onError: ErrorHandler;
    onListening: ListeningHandler;
    constructor(protocol: NetworkProtocol);
    get protocol(): NetworkProtocol;
    get state(): ServerConnectionState;
    abstract listen(port: number): void;
    abstract close(): void;
    abstract broadcast(message: any | Message): void;
    abstract send(socketId: SocketId, message: any | Message): void;
}
export {};
