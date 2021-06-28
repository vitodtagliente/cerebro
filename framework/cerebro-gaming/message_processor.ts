import { StatusCode } from "../cerebro-http";
import Logger from "../cerebro-logger";
import { CommandId } from "./command";
import CommandRegister from "./command_register";
import Endpoint from "./endpoint";
import Message from "./message";
import UserManager from "./user_manager";
import User from "./user";

export default class MessageProcessor
{
    private _commandRegister: CommandRegister;
    private _userManager: UserManager;

    public constructor(userManager: UserManager, commandRegister: CommandRegister)
    {
        this._userManager = userManager;
        this._commandRegister = commandRegister;
    }

    public process(endpoint: Endpoint, message: string): void
    {
        let user: User = this._userManager.findByEndpoint(endpoint);
        if (user == null)
        {
            user = UserManager.create(endpoint);
            if (!this._userManager.add(user))
            {
                Logger.error(`Failed to process the message '${message}' for user ${endpoint.toString()}`);
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
            Logger.error(`Failed to parse the message '${message}' for user ${endpoint.toString()}`);
            return;
        }

        if (structuredMessage == null)
        {
            Logger.error(`Failed to parse the message '${message}' for user ${endpoint.toString()}`);
            return;
        }

        const commandId: CommandId = structuredMessage.header.type;
        const command = this._commandRegister.find(commandId);
        if (command == null)
        {
            Logger.warn(`Cannot find a command ${commandId} for processing the message '${message}' for user ${endpoint.toString()}`);
            return;
        }

        const commandError: StatusCode = command.execute(user, structuredMessage);
        if (commandError != StatusCode.OK)
        {
            Logger.error(`Failed to execute the command ${commandId} with error ${commandError}`);
        }
    }
}