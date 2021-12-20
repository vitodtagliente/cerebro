import ClientConnection, { ClientConnectionState } from "./client_connection";
import { ClientComponent } from "./component";
import ComponentRegister from "./component_register";
import ConnectionFactory from "./connection_factory";
import Encoding from "./encoding";
import Message from "./message";
import { NetworkProtocol } from "./network";
import { RpcId, RpcResponse } from "./rpc";
import RpcProcessor from "./rpc_processor";
import RpcRegister from "./rpc_register";
import UserSession from "./user_session";

type EventHandler = () => void;
type ConnectionHandler = () => void;
type MessageHandler = (message: Message) => void;

export default class Client
{
    public onInitializing: EventHandler = () => { };
    public onConnection: ConnectionHandler = () => { };
    public onDisconnection: ConnectionHandler = () => { };
    public onMessage: MessageHandler = (message: Message) => { };

    private _socket: ClientConnection;
    private _rpcProcessor: RpcProcessor;
    private _componentRegister: ComponentRegister<ClientComponent>;
    private _userSession: UserSession;

    public constructor(protocol: NetworkProtocol)
    {
        this._socket = ConnectionFactory.client(protocol);
        if (this._socket == null)
        {
            console.error(`Cannot initialize the client with protocol[${protocol}]`);
            return;
        }

        this._rpcProcessor = new RpcProcessor;
        this._componentRegister = new ComponentRegister<ClientComponent>();
        this._userSession = new UserSession;

        this._socket.onConnection = () =>
        {
            this.onConnection();
        };

        this._socket.onDisconnection = () =>
        {
            this.onDisconnection();
        };

        this._socket.onMessage = (rawMessage: string) =>
        {
            const message: Message = Message.parse(rawMessage);
            if (message == null)
            {
                console.error(`Failed to parse the message[${rawMessage}]`);
                return;
            }

            this.onMessage(message);
            this._rpcProcessor.process(this._userSession, message);
        };

        this.onInitializing();
    }

    public get components(): ComponentRegister<ClientComponent> { return this._componentRegister; }
    public get rpcs(): RpcRegister { return this._rpcProcessor.register; }
    public get session(): UserSession { return this._userSession; }

    public connect(address: string, port: number): void
    {
        if (this._socket)
        {
            this._socket.connect(address, port);
        }
    }

    public close(): void
    {
        if (this._socket)
        {
            this._socket.close();
        }
    }

    public send(message: any | Message): void
    {
        if (this._socket)
        {
            this._socket.send(message);
        }
    }

    public async call<RequestType, ResponseType>(rpcId: RpcId, request: RequestType): Promise<ResponseType>
    {
        return new Promise<ResponseType>((resolve: Function, reject: Function) =>
        {
            const message: Message = this._rpcProcessor.request(rpcId, request, (rpcResponse: RpcResponse) =>
            {
                let response: ResponseType = null;
                if (rpcResponse)
                {
                    response = Encoding.tryParse<ResponseType>(rpcResponse.data);
                }
                resolve(response);
            });

            if (message == null)
            {
                console.error(`Failed to call the rpc[${rpcId}]`);
                reject();
            }
            else
            {
                this.send(message);
            }
        });
    }
}