export class GameSettings
{

}

export default class Game 
{
    private _settings: GameSettings;

    public constructor(settings: GameSettings = new GameSettings)
    {
        this._settings = settings;
    }

    public get settings(): GameSettings { return this._settings; }
}