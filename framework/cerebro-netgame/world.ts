import Level, { LevelId } from "./level";

export default class World
{
    private static _main: World = null;
    public static get main(): World { return World._main; }

    private _levels: Map<LevelId, Level>;

    public constructor()
    {
        World._main = this;
        this._levels = new Map<LevelId, Level>();
    }

    public get levels(): Map<LevelId, Level> { return this._levels; }

    public get(levelId: LevelId): Level
    {
        if (this._levels.has(levelId) == false)
        {
            this._levels.set(levelId, new Level(levelId));
        }
        return this._levels.get(levelId);
    }
}