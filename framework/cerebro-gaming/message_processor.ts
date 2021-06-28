import { StatusCode } from "../cerebro-http";
import Logger from "../cerebro-logger";
import { CommandId } from "./command";
import CommandRegister from "./command_register";
import Message from "./message";
import UserManager from "./user_manager";
import User from "./user";
import NetworkId from "./network_id";

export default class MessageProcessor
{
    private _commandRegister: CommandRegister;
    private _userManager: UserManager;

    public constructor(userManager: UserManager, commandRegister: CommandRegister)
    {
        this._userManager = userManager;
        this._commandRegister = commandRegister;
    }

    public process(socketId: NetworkId, message: string): void
    {
        let user: User = this._userManager.find(socketId);
        if (user == null)
        {
            user = new User;
            if (!this._userManager.add(socketId, user))
            {
                Logger.error(`Failed to process the message '${message}' for user ${user.id}`);
                return;
            }
        }

        let structuredMessage: Message = null;
        try
        {
            structuredMessage = JSON.parse(message);
        }
        catch
        {
            Logger.error(`Failed to parse the message '${message}' for user ${user.id}`);
            return;
        }

        if (structuredMessage == null)
        {
            Logger.error(`Failed to parse the message '${message}' for user ${user.id}`);
            return;
        }

        const commandId: CommandId = structuredMessage.header.type;
        const command = this._commandRegister.find(commandId);
        if (command == null)
        {
            Logger.warn(`Cannot find a command ${commandId} for processing the message '${message}' for user ${user.id}`);
            return;
        }

        const commandError: StatusCode = command.execute(user, structuredMessage);
        if (commandError != StatusCode.OK)
        {
            Logger.error(`Failed to execute the command ${commandId} with error ${commandError}`);
        }
    }
}