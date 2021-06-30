
export enum NetworkType
{
    UDP,
    WebSockets
}

export type SocketId = string;

type ConnectionHandler = () => void;
type MessageHandler = (message: string) => void;
type ErrorHandler = (error: Error) => void;

export enum NetworkState
{
    Initialized,
    Connected,
    Closed,
    Error
};

export default abstract class NetworkLayer
{
    private _type: NetworkType;
    protected _state: NetworkState;

    public onConnection: ConnectionHandler = () => { };
    public onDisconnection: ConnectionHandler = () => { };
    public onMessage: MessageHandler = (message: string) => { };
    public onError: ErrorHandler = () => { };

    public constructor(type: NetworkType)
    {
        this._type = type;
        this._state = NetworkState.Initialized;
    }

    public get type(): NetworkType { return this._type; }
    public get state(): NetworkState { return this._state; }

    public abstract connect(address: string, port: number): void;
    public abstract close(): void;

    public abstract send(message: any): void;
}