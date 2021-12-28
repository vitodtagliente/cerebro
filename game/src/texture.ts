import Asset, { AssetLoadEvent, AssetType } from "./asset";

export default class Texture extends Asset
{
    public constructor()
    {
        super(AssetType.Image);
        this._data = new window.Image();
    }

    public get data(): HTMLImageElement { return this._data; }
    public get width(): number { return this.data.naturalWidth; }
    public get height(): number { return this.data.naturalHeight; }

    protected _isLoaded(): boolean
    {
        return this.data.complete && this.height !== 0;
    }

    protected _load(filename: string, onLoadCallback?: AssetLoadEvent): boolean
    {
        this._data.onload = onLoadCallback;
        this._data.src = filename;
        return true;
    }

    public dispose(): void
    {
        this._data = null;
    }
}