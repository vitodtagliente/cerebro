import { StatusCode } from "cerebro-http";
import Command, { CommandId, CommandSettings } from "../command";
import Message from "../message";
import { UserSession } from "../user_session_manager";

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

    protected _execute(userSession: UserSession, message: Message): StatusCode
    {
        userSession.authenticated = true;
        userSession.user.state.name = message.body.data[MessageData.Username];

        return StatusCode.OK;
    }
}