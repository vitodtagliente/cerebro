import { Command, CommandId, CommandResponse, CommandSettings, Message, UserSession } from 'cerebro-netcore';

export const commandId: CommandId = "auth";

export class Request
{
    public username: string;
}

export class Response
{

}

export default class AuthenticationCommand extends Command
{
    public constructor()
    {
        const settings: CommandSettings = new CommandSettings;
        settings.requireAuthentication = false;

        super(commandId, settings);
    }

    public execute(userSession: UserSession, message: Message): CommandResponse
    {
        userSession.authenticated = true;
        // userSession.user.state.name = request.username;
        // 
        // Logger.info(`user[${userSession.user.id}] authenticated with name[${userSession.user.state.name}]`);
        // 
        // return StatusCode.OK;

        return null;
    }
}