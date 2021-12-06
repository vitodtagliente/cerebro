import { ActionId } from "./action";
import ActionProcessor from "./action_processor";
import ActionRegister from "./action_register";
import { CommandId, CommandResponse } from "./command";
import CommandProcessor from "./command_processor";
import CommandRegister from "./command_register";
import ConnectionFactory from "./connection_factory";
import Encoding from "./encoding";
import Message from "./message";
import { NetworkProtocol, SocketId } from "./network";
import ServerConnection, { ServerConnectionState } from "./server_connection";
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
    private _actionProcessor: ActionProcessor;
    private _commandProcessor: CommandProcessor;
    private _userSessionManager: UserSessionManager;

    public constructor(protocol: NetworkProtocol)
    {
        this._socket = ConnectionFactory.server(protocol);
        if (this._socket == null)
        {
            console.error(`Cannot initialize the server with protocol[${protocol}]`);
            return;
        }

        this._actionProcessor = new ActionProcessor;
        this._commandProcessor = new CommandProcessor;
        this._userSessionManager = new UserSessionManager;

        this._socket.onClientConnection = (socketId: SocketId) =>
        {
            const userSession: UserSession = this._userSessionManager.create(socketId);
            this.onClientConnection(userSession);
        };

        this._socket.onClientDisconnection = (socketId: SocketId) =>
        {
            const userSession: UserSession = this._userSessionManager.get(socketId);
            this.onClientDisconnection(userSession);

            this._userSessionManager.destroy(socketId);
        };

        this._socket.onClientMessage = (socketId: SocketId, rawMessage: string) =>
        {
            const userSession: UserSession = this._userSessionManager.get(socketId);

            const message: Message = Message.parse(rawMessage);
            if (message == null)
            {
                console.error(`Failed to parse the message[${rawMessage}]`);
                return;
            }

            this.onClientMessage(userSession, message);
            this._actionProcessor.process(userSession, message);
            const response: Message = this._commandProcessor.process(userSession, message);
            if (response)
            {
                this._socket.send(socketId, response);
            }
        }

        this.onInitializing();
    }

    public get actions(): ActionRegister { return this._actionProcessor.register; }
    public get commands(): CommandRegister { return this._commandProcessor.register; }

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

    public async call<RequestType, ResponseType>(userSession: UserSession, commandId: CommandId, request: RequestType): Promise<ResponseType>
    {
        return new Promise<ResponseType>((resolve: Function, reject: Function) =>
        {
            const message: Message = this._commandProcessor.request(commandId, request, (commandResponse: CommandResponse) =>
            {
                if (commandResponse)
                {
                    const response: ResponseType = Encoding.tryParse<ResponseType>(commandResponse.data);
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
                console.error(`Failed to call the command[${commandId}]`);
                reject();
            }
            else
            {
                this.send(userSession, message);
                resolve();
            }
        });
    }

    public async request<RequestType>(userSession: UserSession, actionId: ActionId, request: RequestType): Promise<void>
    {
        return new Promise<void>((resolve: Function, reject: Function) =>
        {
            const message: Message = this._actionProcessor.request(actionId, request);
            if (message == null)
            {
                console.error(`Failed to call the action[${actionId}]`);
                reject();
            }
            else
            {
                this.send(userSession, message);
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
            // TODO: userSession to socketId
            // this._socket.send(, message);
        }
    }
}