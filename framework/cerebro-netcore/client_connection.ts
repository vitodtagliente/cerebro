import Message from "./message";
import { NetworkProtocol } from "./network";

type ConnectionHandler = () => void;
type MessageHandler = (message: string) => void;
type ErrorHandler = (error: Error) => void;

export enum ClientConnectionState
{
    Initialized,
    Connected,
    Closed,
    Error
};

export default abstract class ClientConnection
{
    private _protocol: NetworkProtocol;
    protected _state: ClientConnectionState;

    public onConnection: ConnectionHandler = () => { };
    public onDisconnection: ConnectionHandler = () => { };
    public onMessage: MessageHandler = (message: string) => { };
    public onError: ErrorHandler = () => { };

    public constructor(protocol: NetworkProtocol)
    {
        this._protocol = protocol;
        this._state = ClientConnectionState.Initialized;
    }

    public get protocol(): NetworkProtocol { return this._protocol; }
    public get state(): ClientConnectionState { return this._state; }

    public abstract connect(address: string, port: number): void;
    public abstract close(): void;

    public abstract send(message: any): void;
    public abstract send(message: Message): void;
}