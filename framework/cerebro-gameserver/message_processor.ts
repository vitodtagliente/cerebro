import { StatusCode } from "../cerebro-http";
import Logger from "../cerebro-logger";
import { Encoding, Message, MessageHeaderField } from "../cerebro-netcore";
import { BaseCommand, CommandId } from "./command";
import CommandRegister from "./command_register";
import { UserSession } from "./user_session_manager";

export default class MessageProcessor
{
    private _commandRegister: CommandRegister;

    public constructor(commandRegister: CommandRegister)
    {
        this._commandRegister = commandRegister;
    }

    public process(userSession: UserSession, message: string): void
    {
        let structuredMessage: Message = null;
        try
        {
            structuredMessage = Encoding.parse<Message>(message);
        }
        catch
        {
            Logger.error(`Failed to parse the message '${message}' for user ${userSession.user.id}`);
            return;
        }

        if (structuredMessage == null)
        {
            Logger.error(`Failed to parse the message '${message}' for user ${userSession.user.id}`);
            return;
        }

        if (structuredMessage.header.fields.has(MessageHeaderField.Command) == false)
        {
            return;
        }

        const commandId: CommandId = structuredMessage.header.fields.get(MessageHeaderField.Command);
        const command: BaseCommand = this._commandRegister.find(commandId);
        if (command == null)
        {
            Logger.warn(`Cannot find a command ${commandId} for processing the message '${message}' for user ${userSession.user.id}`);
            return;
        }

        const commandError: StatusCode = command.execute(userSession, structuredMessage);
        if (commandError != StatusCode.OK)
        {
            Logger.error(`Failed to execute the command ${commandId} with error ${commandError}`);
        }
    }
}