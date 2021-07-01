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

    execute(userSession: UserSession, message: Message): StatusCode { return StatusCode.NotImplemented; }
}

export default abstract class Command<RequestType, ResponseType> extends BaseCommand
{
    private _request: RequestType;
    private _response: ResponseType;

    public constructor(id: CommandId, settings: CommandSettings, request: RequestType, response: ResponseType)
    {
        super(id, settings);
        this._request = request;
        this._response = response;
    }

    public execute(userSession: UserSession, message: Message): StatusCode
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

        try
        {
            this._request = Encoding.parse<RequestType>(message.body);
        }
        catch
        {
            Logger.error(`Failed to parse the message[${message.body}]`);
            return StatusCode.BadRequest;
        }

        const error: StatusCode = this._execute(userSession, this._request, this._response);



        return error;
    }

    protected abstract _execute(userSession: UserSession, request: RequestType, response: ResponseType): StatusCode;
}