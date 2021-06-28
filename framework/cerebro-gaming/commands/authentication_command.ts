import { StatusCode } from "cerebro-http";
import Command, { CommandId, CommandSettings } from "../command";
import Message from "../message";
import User from "../user";

const commandId: CommandId = "auth";

enum MessageData
{
    Username = 'username'
}

export class AuthenticationCommand extends Command
{
    public constructor()
    {
        const settings: CommandSettings = new CommandSettings;
        settings.authentication = false;
        super(commandId, settings);
    }

    protected _execute(user: User, message: Message): StatusCode
    {
        user.state.name = message.body.data[MessageData.Username];
        user.state.authenticated = true;

        return StatusCode.OK;
    }
}