import Message from "./message";
import { StatusCode } from 'cerebro-http';
import Logger from "cerebro-logger";
import { UserSession } from "./user_session_manager";

export type CommandId = string;

export class CommandSettings
{
    public authentication: boolean = false;
}

export class CommandResponse
{
    public code: StatusCode = StatusCode.OK;
}

export default abstract class Command
{
    public static readonly InvalidCommandId: CommandId = '';

    private _id: CommandId;
    private _settings: CommandSettings;

    public constructor(id: CommandId, settings: CommandSettings)
    {
        this._id = id;
        this._settings = settings;
    }

    public get id(): CommandId { return this._id; }
    public get settings(): CommandSettings { return this._settings; }

    public execute(userSession: UserSession, message: Message): StatusCode
    {
        if (message.header.type != this.id)
        {
            Logger.error(`The user[${userSession.user.id}] has tried to execute the command[${this.id}] passing a message of different type[${message.header.type}]`);
            return StatusCode.InternalServerError;
        }

        if (this.settings.authentication && userSession.authenticated == false)
        {
            Logger.error(`The user[${userSession.user.id}] has tried to execute the command[${this.id}] with no authentication`);
            return StatusCode.Unauthorized;
        }

        return this._execute(userSession, message);
    }

    protected abstract _execute(userSession: UserSession, message: Message): StatusCode;
}