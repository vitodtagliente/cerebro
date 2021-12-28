export enum AssetType
{
    Audio,
    Image
}

export default class Asset 
{
    private _filename: string;
    private _type: AssetType;

    public constructor(type: AssetType)
    {
        this._type = type;
    }

    public get filename(): string { return this._filename; }
    public get type(): AssetType { return this._type; }
}