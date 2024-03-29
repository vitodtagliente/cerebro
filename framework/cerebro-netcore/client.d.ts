import { ClientComponent } from "./component";
import ComponentRegister from "./component_register";
import Message from "./message";
import { NetworkProtocol } from "./network";
import { RpcId } from "./rpc";
import RpcRegister from "./rpc_register";
import UserSession from "./user_session";
declare type EventHandler = () => void;
declare type ConnectionHandler = () => void;
declare type MessageHandler = (message: Message) => void;
export default class Client {
    onInitializing: EventHandler;
    onConnection: ConnectionHandler;
    onDisconnection: ConnectionHandler;
    onMessage: MessageHandler;
    private _socket;
    private _rpcProcessor;
    private _componentRegister;
    private _userSession;
    constructor(protocol: NetworkProtocol);
    get components(): ComponentRegister<ClientComponent>;
    get rpcs(): RpcRegister;
    get session(): UserSession;
    connect(address: string, port: number): void;
    close(): void;
    send(message: any | Message): void;
    call<RequestType, ResponseType>(rpcId: RpcId, request: RequestType): Promise<ResponseType>;
}
export {};
