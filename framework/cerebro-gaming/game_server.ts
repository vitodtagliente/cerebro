import Command from "./command";
import CommandRegister from "./command_register";
import MessageProcessor from "./message_processor";
import NetworkLayer, { NetworkType, SocketId } from "./network_layer";
import NetworkLayerFactory from "./network_layer_factory";
import Logger from "cerebro-logger";
import UserSessionManager, { UserSession } from "./user_session_manager";

export default class GameServer
{
    private _commandRegister: CommandRegister;
    private _network: NetworkLayer;
    private _messageProcessor: MessageProcessor;
    private _userSessionManager: UserSessionManager;

    public constructor(type: NetworkType)
    {
        this._network = NetworkLayerFactory.get(type);
        if (this._network == null)
        {
            Logger.error(`Cannot initialize the NetworkLAyer of type[${type}]`);
            return;
        }

        this._commandRegister = new CommandRegister;
        this._registerStandardCommands();

        this._userSessionManager = new UserSessionManager;

        this._messageProcessor = new MessageProcessor(this._commandRegister);

        this._network.onClientConnection = (socketId: SocketId) =>
        {
            this._userSessionManager.create(socketId);
        };

        this._network.onClientDisconnection = (socketId: SocketId) =>
        {
            this._userSessionManager.destroy(socketId);
        };

        this._network.onClientMessage = (socketId: SocketId, message: string) =>
        {
            const userSession: UserSession = this._userSessionManager.get(socketId);
            this._messageProcessor.process(userSession, message);
        }
    }

    public listen(port: number): void
    {
        if (this._network)
        {
            this._network.listen(port);
        }
    }

    public register<T extends Command>(ctor: { new(...args): T }): void
    {
        const command: T = new ctor();
        this._commandRegister.add(command);
    }

    private _registerStandardCommands()
    {

    }
}