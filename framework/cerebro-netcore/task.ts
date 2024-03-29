export class TaskSettings
{
    public lifetime: number = 60; // seconds
}

export default abstract class Task
{
    private _settings: TaskSettings;

    public constructor(settings: TaskSettings = new TaskSettings)
    {
        this._settings = settings;
    }

    public get settings(): TaskSettings { return this._settings; }

    public abstract execute(): void;
}