import NetworkLayerUDP from "./network_layer_udp";

enum Type
{
    UDP,
    WebSockets
}

type ErrorHandler = (error: Error) => void;
type ListeningHandler = () => void;
type MessageHandler = (message: string) => void;

enum State
{
    Initialized,
    Listening,
    Error
};

export default abstract class NetworkLayer
{
    public static readonly Type = Type;
    public static readonly State = State;

    public static get(type: Type): NetworkLayer
    {
        switch (type)
        {
            case Type.UDP:
                return new NetworkLayerUDP();
            case Type.WebSockets:
            default:
                return null;
        }
    }

    private _type: Type;
    protected _state: State;

    public onError: ErrorHandler = () => { };
    public onListening: ListeningHandler = () => { };
    public onMessage: MessageHandler = (message: string) => { };

    public constructor(type: Type)
    {
        this._type = type;
        this._state = State.Initialized;
    }

    public get type(): Type { return this._type; }
    public get state(): State { return this._state; }

    public listen(port: number): void
    {

    }
}