import { Encoding } from "cerebro-netcore";
import { Entity } from "../scene";
import Asset, { AssetLoadEvent, AssetType } from "./asset";

export default class Prefab extends Asset
{
    private _request: XMLHttpRequest;

    public constructor()
    {
        super(AssetType.Prefab);
        this._data = null;
        this._request = new XMLHttpRequest;
    }

    public get data(): any { return this._data; }

    protected _isLoaded(): boolean
    {
        return this._request.status == 200 && this._request.readyState == 4;
    }

    protected _load(filename: string, onLoadCallback?: AssetLoadEvent): boolean
    {
        this._request.open("GET", filename, true);
        this._request.onreadystatechange = () =>
        {
            if (this.isLoaded)
            {
                const content: string = this._request.responseText;
                this._data = JSON.parse(content);
                onLoadCallback();
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