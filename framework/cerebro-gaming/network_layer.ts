import NetworkLayerUDP from "./network_layer_udp";

export enum NetworkType
{
    UDP,
    WebSockets
}

type ErrorHandler = (error: Error) => void;
type ListeningHandler = () => void;
type MessageHandler = (message: string) => void;

export enum NetworkState
{
    Initialized,
    Listening,
    Error
};

export default abstract class NetworkLayer
{
    public static factory(type: NetworkType): NetworkLayer
    {
        switch (type)
        {
            case NetworkType.UDP:
                return new NetworkLayerUDP();
            case NetworkType.WebSockets:
            default:
                return null;
        }
    }

    private _type: NetworkType;
    protected _state: NetworkState;

    public onError: ErrorHandler = () => { };
    public onListening: ListeningHandler = () => { };
    public onMessage: MessageHandler = (message: string) => { };

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