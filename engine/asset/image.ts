import Asset, { AssetType } from "./asset";

export default class Image extends Asset
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

    protected _load(filename: string): boolean
    {
        this._data.onload = () => { this.onLoad.emit(); };
        this._data.src = filename;
        return true;
    }

    public dispose(): void
    {
        this._data = null;
    }
}