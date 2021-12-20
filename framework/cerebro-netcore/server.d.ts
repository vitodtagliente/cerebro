import { ServerComponent } from "./component";
import ComponentRegister from "./component_register";
import Message from "./message";
import { NetworkProtocol } from "./network";
import { RpcId } from "./rpc";
import RpcRegister from "./rpc_register";
import TaskScheduler from "./task_scheduler";
import UserSession from "./user_session";
declare type EventHandler = () => void;
declare type ConnectionHandler = (userSession: UserSession) => void;
declare type MessageHandler = (userSession: UserSession, message: Message) => void;
export default class Server {
    onInitializing: EventHandler;
    onListening: EventHandler;
    onClientConnection: ConnectionHandler;
    onClientDisconnection: ConnectionHandler;
    onClientMessage: MessageHandler;
    private _socket;
    private _componentRegister;
    private _rpcProcessor;
    private _taskScheduler;
    private _userSessionManager;
    constructor(protocol: NetworkProtocol);
    get components(): ComponentRegister<ServerComponent>;
    get rpcs(): RpcRegister;
    get tasks(): TaskScheduler;
    listen(port: number): void;
    close(): void;
    call<RequestType, ResponseType>(userSession: UserSession, rpcId: RpcId, request: RequestType): Promise<ResponseType>;
    broadcastCall<RequestType, ResponseType>(rpcId: RpcId, request: RequestType): Promise<ResponseType>;
    broadcast(message: any | Message): void;
    send(userSession: UserSession, message: any | Message): void;
}
export {};
