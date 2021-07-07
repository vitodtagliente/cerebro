import { Command, CommandId, CommandSettings, UserSession } from 'cerebro-netcore';

export const commandId: CommandId = "auth";

export class Request
{
    public username: string;
}

export class Response
{

}

export default class AuthenticationCommand extends Command<Request, Response>
{
    public constructor()
    {
        const settings: CommandSettings = new CommandSettings;
        settings.requireAuthentication = false;

        super(commandId, settings);
    }

    public _execute(userSession: UserSession, request: Request): Response
    {
        userSession.authenticated = true;
        userSession.user.state.name = request.username;

        console.info(`user[${userSession.user.id}] authenticated with name[${userSession.user.state.name}]`);

        return new Response;
    }
}