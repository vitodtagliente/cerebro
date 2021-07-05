
export type CommandId = string;

export class CommandSettings
{
    public requireAuthentication: boolean = false;
    public requireUserSession: boolean = false;
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
}