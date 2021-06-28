import Command from "./command";
import CommandRegister from "./command_register";
import Endpoint from "./endpoint";
import MessageProcessor from "./message_processor";
import NetworkLayer, { NetworkType } from "./network_layer";
import NetworkLayerFactory from "./network_layer_factory";
import UserManager from "./user_manager";

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

        this._messageProcessor = new MessageProcessor(this._userManager, this._commandRegister);

        this._network = NetworkLayerFactory.get(type);
        if (this._network)
        {
            this._network.onMessage = (endpoint: Endpoint, message: string) => this._messageProcessor.process(endpoint, message);
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