import { CommandId } from "./command";
import CommandRegister from "./command_register";
import { ClientComponent } from "./component";
import ComponentRegister from "./component_register";
import Message from "./message";
import { NetworkProtocol } from "./network";
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
    private _commandProcessor;
    private _componentRegister;
    private _userSession;
    constructor(protocol: NetworkProtocol);
    get commands(): CommandRegister;
    get components(): ComponentRegister<ClientComponent>;
    get session(): UserSession;
    connect(address: string, port: number): void;
    close(): void;
    send(message: any | Message): void;
    call<RequestType, ResponseType>(commandId: CommandId, request: RequestType): Promise<ResponseType>;
}
export {};
