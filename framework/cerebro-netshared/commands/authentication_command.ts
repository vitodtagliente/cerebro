const commandId: CommandId = "auth";

export class Request
{
    public username: string;
}

export class Response
{

}

export class AuthenticationCommand extends Command<Request, Response>
{
    public constructor()
    {
        const settings: CommandSettings = new CommandSettings;
        settings.requireAuthentication = false;

        super(commandId, settings, new Request, new Response);
    }

    protected _execute(userSession: UserSession, request: Request, response: Response): StatusCode
    {
        userSession.authenticated = true;
        userSession.user.state.name = request.username;

        Logger.info(`user[${userSession.user.id}] authenticated with name[${userSession.user.state.name}]`);

        return StatusCode.OK;
    }
}