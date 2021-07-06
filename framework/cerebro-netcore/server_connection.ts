import Message from "./message";
import { NetworkProtocol, SocketId } from "./network";

type ClientConnectionHandler = (socketId: SocketId) => void;
type ClientMessageHandler = (socketId: SocketId, message: string) => void;
type ErrorHandler = (error: Error) => void;
type ListeningHandler = () => void;

export enum ServerConnectionState
{
    Initialized,
    Listening,
    Error
};

export default abstract class ServerConnection
{
    private _protocol: NetworkProtocol;
    protected _state: ServerConnectionState;

    public onClientConnection: ClientConnectionHandler = (socketId: SocketId) => { };
    public onClientDisconnection: ClientConnectionHandler = (socketId: SocketId) => { };
    public onClientMessage: ClientMessageHandler = (socketId: SocketId, message: string) => { };
    public onError: ErrorHandler = () => { };
    public onListening: ListeningHandler = () => { };

    public constructor(protocol: NetworkProtocol)
    {
        this._protocol = protocol;
        this._state = ServerConnectionState.Initialized;
    }

    public get protocol(): NetworkProtocol { return this._protocol; }
    public get state(): ServerConnectionState { return this._state; }

    public abstract listen(port: number): void;
    public abstract close(): void;

    public abstract send(socketId: SocketId, message: any): void;
    public abstract send(socketId: SocketId, message: Message): void;
}