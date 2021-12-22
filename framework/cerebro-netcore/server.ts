import { ServerComponent } from "./component";
import ComponentRegister from "./component_register";
import ConnectionFactory from "./connection_factory";
import Encoding from "./encoding";
import Message from "./message";
import { InvalidSocketId, NetworkProtocol, SocketId } from "./network";
import { RpcId, RpcResponse } from "./rpc";
import RpcProcessor from "./rpc_processor";
import RpcRegister from "./rpc_register";
import ServerConnection from "./server_connection";
import TaskScheduler from "./task_scheduler";
import UserSession from "./user_session";
import UserSessionManager from "./user_session_manager";

type EventHandler = () => void;
type ConnectionHandler = (userSession: UserSession) => void;
type MessageHandler = (userSession: UserSession, message: Message) => void;

type ResponseHandler<ResponseType> = (error: number, response?: ResponseType) => void;

export default class Server
{
    public onInitializing: EventHandler = () => { };
    public onListening: EventHandler = () => { };
    public onClientConnection: ConnectionHandler = (userSession: UserSession) => { };
    public onClientDisconnection: ConnectionHandler = (userSession: UserSession) => { };
    public onClientMessage: MessageHandler = (userSession: UserSession, message: Message) => { };

    private _socket: ServerConnection;
    private _componentRegister: ComponentRegister<ServerComponent>;
    private _rpcProcessor: RpcProcessor;
    private _taskScheduler: TaskScheduler;
    private _userSessionManager: UserSessionManager;

    public constructor(protocol: NetworkProtocol)
    {
        this._socket = ConnectionFactory.server(protocol);
        if (this._socket == null)
        {
            console.error(`Cannot initialize the server with protocol[${protocol}]`);
            return;
        }

        this._componentRegister = new ComponentRegister<ServerComponent>();
        this._rpcProcessor = new RpcProcessor;
        this._taskScheduler = new TaskScheduler(0); // 10000 = 10s
        this._userSessionManager = new UserSessionManager;

        this._socket.onClientConnection = (socketId: SocketId) =>
        {
            const userSession: UserSession = this._userSessionManager.create(socketId);
            for (let [id, component] of this.components.components)
            {
                component.onClientConnection(userSession);
            }
            this.onClientConnection(userSession);
        };

        this._socket.onClientDisconnection = (socketId: SocketId) =>
        {
            const userSession: UserSession = this._userSessionManager.get(socketId);
            for (let [id, component] of this.components.components)
            {
                component.onClientDisconnection(userSession);
            }
            this.onClientDisconnection(userSession);

            this._userSessionManager.destroy(socketId);
        };

        this._socket.onClientMessage = (socketId: SocketId, rawMessage: string) =>
        {
            // TODO: temporarly hooked into the message handler
            this._taskScheduler.tick();

            const userSession: UserSession = this._userSessionManager.get(socketId);

            const message: Message = Message.parse(rawMessage);
            if (message == null)
            {
                console.error(`Failed to parse the message[${rawMessage}]`);
                return;
            }

            this.onClientMessage(userSession, message);
            const response: Message = this._rpcProcessor.process(userSession, message);
            if (response)
            {
                this._socket.send(socketId, response);
            }
        }

        this.onInitializing();
    }

    public get components(): ComponentRegister<ServerComponent> { return this._componentRegister; }
    public get rpcs(): RpcRegister { return this._rpcProcessor.register; }
    public get tasks(): TaskScheduler { return this._taskScheduler; }
    public get userSessionManager(): UserSessionManager { return this._userSessionManager; }

    public listen(port: number): void
    {
        if (this._socket)
        {
            this._socket.onListening = this.onListening;
            this._socket.listen(port);
        }
    }

    public close(): void
    {
        if (this._socket)
        {
            this._socket.close();
        }
    }

    public async call<RequestType, ResponseType>(userSession: UserSession, rpcId: RpcId, request: RequestType): Promise<ResponseType>
    {
        return new Promise<ResponseType>((resolve: Function, reject: Function) =>
        {
            const message: Message = this._rpcProcessor.request(rpcId, request, (rpcResponse: RpcResponse) =>
            {
                if (rpcResponse)
                {
                    const response: ResponseType = Encoding.tryParse<ResponseType>(rpcResponse.data);
                    if (response)
                    {
                        resolve(response);
                    }
                    else reject();
                }
                else reject();
            });

            if (message == null)
            {
                console.error(`Failed to call the rpc[${rpcId}]`);
                reject();
            }
            else
            {
                this.send(userSession, message);
                resolve();
            }
        });
    }

    public async broadcastCall<RequestType, ResponseType>(rpcId: RpcId, request: RequestType): Promise<ResponseType>
    {
        return new Promise<ResponseType>((resolve: Function, reject: Function) =>
        {
            const message: Message = this._rpcProcessor.request(rpcId, request, (rpcResponse: RpcResponse) =>
            {
                if (rpcResponse)
                {
                    const response: ResponseType = Encoding.tryParse<ResponseType>(rpcResponse.data);
                    if (response)
                    {
                        resolve(response);
                    }
                    else reject();
                }
                else reject();
            });

            if (message == null)
            {
                console.error(`Failed to call the rpc[${rpcId}]`);
                reject();
            }
            else
            {
                this.broadcast(message);
                resolve();
            }
        });
    }

    public broadcast(message: any | Message): void
    {
        if (this._socket)
        {
            this._socket.broadcast(message);
        }
    }

    public send(userSession: UserSession, message: any | Message): void
    {
        if (this._socket)
        {
            const socketId: SocketId = this._userSessionManager.getSocketId(userSession);
            if (socketId == InvalidSocketId)
            {
                console.error(`Cannot find the socket for user[${userSession.id}]`);
                return;
            }
            this._socket.send(socketId, message);
        }
    }
}