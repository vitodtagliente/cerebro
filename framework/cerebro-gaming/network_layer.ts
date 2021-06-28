
export enum NetworkType
{
    UDP,
    WebSockets
}

export type SocketId = string;

type ErrorHandler = (error: Error) => void;
type ListeningHandler = () => void;
type MessageHandler = (socketId: SocketId, message: string) => void;

export enum NetworkState
{
    Initialized,
    Listening,
    Error
};

export default abstract class NetworkLayer
{
    private _type: NetworkType;
    protected _state: NetworkState;

    public onError: ErrorHandler = () => { };
    public onListening: ListeningHandler = () => { };
    public onMessage: MessageHandler = (socketId: SocketId, message: string) => { };

    public constructor(type: NetworkType)
    {
        this._type = type;
        this._state = NetworkState.Initialized;
    }

    public get type(): NetworkType { return this._type; }
    public get state(): NetworkState { return this._state; }

    public listen(port: number): void
    {

    }
}