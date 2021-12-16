export declare class TaskSettings {
    lifetime: number;
}
export default abstract class Task {
    private _settings;
    constructor(settings?: TaskSettings);
    get settings(): TaskSettings;
    abstract execute(): void;
}
