import { BaseCommand } from "./command";
import CommandRegister from "./command_register";
import Logger from "cerebro-logger";
import MessageProcessor from "./message_processor";
import UserSessionManager, { UserSession } from "./user_session_manager";
import { NetworkProtocol, NodeFactory, Server, SocketId } from 'cerebro-netcore';

// standard commands
import { AuthenticationCommand } from "./commands/authentication_command";

type ListeningHandler = () => void;

export default class GameServer
{
    public onListening: ListeningHandler = () => { };

    private _commandRegister: CommandRegister;
    private _socket: Server;
    private _messageProcessor: MessageProcessor;
    private _userSessionManager: UserSessionManager;

    public constructor(protocol: NetworkProtocol)
    {
        this._socket = NodeFactory.server(protocol);
        if (this._socket == null)
        {
            Logger.error(`Cannot initialize the server with protocol[${protocol}]`);
            return;
        }

        this._commandRegister = new CommandRegister;
        this._registerStandardCommands();

        this._userSessionManager = new UserSessionManager;

        this._messageProcessor = new MessageProcessor(this._commandRegister);

        this._socket.onClientConnection = (socketId: SocketId) =>
        {
            this._userSessionManager.create(socketId);
        };

        this._socket.onClientDisconnection = (socketId: SocketId) =>
        {
            this._userSessionManager.destroy(socketId);
        };

        this._socket.onClientMessage = (socketId: SocketId, message: string) =>
        {
            const userSession: UserSession = this._userSessionManager.get(socketId);
            this._messageProcessor.process(userSession, message);
        }
    }

    public listen(port: number): void
    {
        if (this._socket)
        {
            this._socket.onListening = this.onListening;
            this._socket.listen(port);
        }
    }

    public register<T extends BaseCommand>(ctor: { new(...args): T }): void
    {
        const command: T = new ctor();
        this._commandRegister.add(command);
    }

    private _registerStandardCommands()
    {
        this.register(AuthenticationCommand);
    }
}