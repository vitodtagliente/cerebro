import Message from "./message";
import { StatusCode } from 'cerebro-http';
import Logger from "cerebro-logger";
import { UserSession } from "./user_session_manager";
import Encoding from "./encoding";

export type CommandId = string;
export const InvalidCommandId: CommandId = '';

export class CommandSettings
{
    public requireAuthentication: boolean = false;
    public requireUserSession: boolean = false;
}

export class CommandResponse
{
    public code: StatusCode = StatusCode.OK;
}

export class BaseCommand
{
    private _id: CommandId;
    private _settings: CommandSettings;

    public constructor(id: CommandId, settings: CommandSettings)
    {
        this._id = id;
        this._settings = settings;
    }

    public get id(): CommandId { return this._id; }
    public get settings(): CommandSettings { return this._settings; }

    execute(userSession: UserSession, message: Message, responseTypeCtor?: any): StatusCode { return StatusCode.NotImplemented; }
}

export default abstract class Command<RequestType, ResponseType> extends BaseCommand
{
    public constructor(id: CommandId, settings: CommandSettings)
    {
        super(id, settings);
    }

    public execute(userSession: UserSession, message: Message, responseTypeCtor: { new(...args): ResponseType }): StatusCode
    {
        if (message.header.type != this.id)
        {
            Logger.error(`The user[${userSession.user.id}] has tried to execute the command[${this.id}] passing a message of different type[${message.header.type}]`);
            return StatusCode.InternalServerError;
        }

        if (this.settings.requireAuthentication && userSession.authenticated == false)
        {
            Logger.error(`The user[${userSession.user.id}] has tried to execute the command[${this.id}] with no authentication`);
            return StatusCode.Unauthorized;
        }

        let request: RequestType = null;
        let response: ResponseType = null;

        try
        {
            request = Encoding.parse<RequestType>(message.body);
            // response = new responseTypeCtor;
        }
        catch
        {
            Logger.error(`Failed to parse the message[${message.body}]`);
            return StatusCode.BadRequest;
        }

        return this._execute(userSession, request, response);
    }

    protected abstract _execute(userSession: UserSession, request: RequestType, response: ResponseType): StatusCode;
}