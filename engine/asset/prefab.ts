import Asset, { AssetLoadEvent, AssetType } from "./asset";

export default class Prefab extends Asset
{
    public constructor()
    {
        super(AssetType.Prefab);
        this._data = null;
    }

    public get data(): Object { return this._data; }

    protected _isLoaded(): boolean
    {
        return this.data != null;
    }

    protected _load(filename: string, onLoadCallback?: AssetLoadEvent): boolean
    {
        // this._data.onload = onLoadCallback;
        // this._data.src = filename;
        return true;
    }

    public dispose(): void
    {
        this._data = null;
    }
}