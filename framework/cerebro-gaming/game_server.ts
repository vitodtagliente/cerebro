import Command from "./command";
import CommandRegister from "./command_register";
import MessageProcessor from "./message_processor";
import NetworkLayer, { NetworkType, SocketId } from "./network_layer";
import NetworkLayerFactory from "./network_layer_factory";
import UserManager from "./user_manager";
import NetworkId, { InvalidNetworkId } from "./network_id";
import Logger from "cerebro-logger";
import User from "./user";

export default class GameServer
{
    private _commandRegister: CommandRegister;
    private _network: NetworkLayer;
    private _messageProcessor: MessageProcessor;
    private _userManager: UserManager;

    public constructor(type: NetworkType)
    {
        this._commandRegister = new CommandRegister;
        this._registerStandardCommands();

        this._userManager = new UserManager;

        this._messageProcessor = new MessageProcessor(this._commandRegister);

        this._network = NetworkLayerFactory.get(type);
        if (this._network)
        {
            this._network.onClientMessage = (socketId: SocketId, message: string) =>
            {
                const user: User = this._userManager.findOrCreate(socketId);
                if (user == null)
                {
                    Logger.error(`Cannot find or create an user for socketId[${socketId}]`);
                    return;
                }
                this._messageProcessor.process(user, message);
            }
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