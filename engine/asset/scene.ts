import Asset, { AssetType } from "./asset";

export default class Scene extends Asset
{
    private _request: XMLHttpRequest;

    public constructor()
    {
        super(AssetType.Scene);
        this._data = null;
        this._request = new XMLHttpRequest;
    }

    public get data(): any { return this._data; }

    protected _isLoaded(): boolean
    {
        return this._request.status == 200 && this._request.readyState == 4;
    }

    protected _load(filename: string): boolean
    {
        this._request.open("GET", filename, true);
        this._request.onreadystatechange = () =>
        {
            if (this.isLoaded)
            {
                const content: string = this._request.responseText;
                this._data = JSON.parse(content);
                this.onLoad.emit();
            }
        };
        this._request.send();
        return true;
    }

    public dispose(): void
    {
        this._data = null;
    }
}