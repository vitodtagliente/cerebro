import Message from "./message";
import UserSession from "./user_session";

export type CommandId = string;

export class CommandSettings
{
    public requireAuthentication: boolean = false;
    public requireResponse: boolean = true;
    public requireUserSession: boolean = false;
}

export class CommandResponse
{
    public statusCode: number;
    public data: any;

    public constructor(statusCode: number = 200, data?: any)
    {
        this.statusCode = statusCode;
        this.data = data;
    }
}

export default abstract class Command
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

    public abstract execute(userSession: UserSession, message: Message): CommandResponse;
}