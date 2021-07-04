export type LevelId = string;

export class LevelState
{
    public data: Map<string, string>;

    public constructor()
    {
        this.data = new Map<string, string>();
    }
}

export default class Level
{
    private _id: LevelId;
    public state: LevelState;

    public constructor(id: LevelId)
    {
        this._id = id;
        this.state = new LevelState;
    }

    public get id(): LevelId { return this._id; }
}