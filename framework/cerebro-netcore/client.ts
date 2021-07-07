import ClientConnection, { ClientConnectionState } from "./client_connection";
import { CommandId } from "./command";
import CommandProcessor from "./command_processor";
import CommandRegister from "./command_register";
import ConnectionFactory from "./connection_factory";
import Message from "./message";
import { NetworkProtocol } from "./network";
import UserSession from "./user_session";

type EventHandler = () => void;
type ConnectionHandler = () => void;
type MessageHandler = (message: Message) => void;

type ResponseHandler<ResponseType> = (error: number, response?: ResponseType) => void;

export default class Client
{
    public onInitializing: EventHandler = () => { };
    public onConnection: ConnectionHandler = () => { };
    public onDisconnection: ConnectionHandler = () => { };
    public onMessage: MessageHandler = (message: Message) => { };

    private _socket: ClientConnection;
    private _commandProcessor: CommandProcessor;
    private _userSession: UserSession;

    public constructor(protocol: NetworkProtocol)
    {
        this._socket = ConnectionFactory.client(protocol);
        if (this._socket == null)
        {
            console.error(`Cannot initialize the client with protocol[${protocol}]`);
            return;
        }

        this._commandProcessor = new CommandProcessor;
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
            this._commandProcessor.process(this._userSession, message);
        };

        this.onInitializing();
    }

    public get register(): CommandRegister { return this._commandProcessor.register; }
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

    public call<RequestType, ResponseType>(commandId: CommandId, request: RequestType, callback: ResponseHandler<ResponseType>): void
    {
        const message: Message = this._commandProcessor.request(commandId, request, callback);
        if (message == null)
        {
            console.error(`Failed to call the command[${commandId}]`);
            return;
        }

        this.send(message);
    }
}