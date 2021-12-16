export declare class TaskSettings {
}
export default abstract class Task {
    private _settings;
    constructor(settings?: TaskSettings);
    get settings(): TaskSettings;
    abstract execute(): void;
}
