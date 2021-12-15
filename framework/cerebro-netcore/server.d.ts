import { CommandId } from "./command";
import CommandRegister from "./command_register";
import Message from "./message";
import { NetworkProtocol } from "./network";
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
    private _commandProcessor;
    private _userSessionManager;
    constructor(protocol: NetworkProtocol);
    get commands(): CommandRegister;
    listen(port: number): void;
    close(): void;
    call<RequestType, ResponseType>(userSession: UserSession, commandId: CommandId, request: RequestType): Promise<ResponseType>;
    broadcast(message: any | Message): void;
    send(userSession: UserSession, message: any | Message): void;
}
export {};
