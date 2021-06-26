import Message from "./message";
import { User } from "./user_manager";

export type CommandId = string;

export class CommandSettings
{
    public authentication: boolean = false;
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

    public execute(user: User, message: Message): void
    {

    }
}