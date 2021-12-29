import { Signal } from "../core";
import AssetLibrary from "./asset_library";

export enum AssetType
{
    Audio,
    Image,
    Prefab
}

export type AssetLoadEvent = () => void;

export default abstract class Asset 
{
    protected _data: any;
    private _filename: string;
    private _type: AssetType;

    public onDispose: Signal<void>;

    public constructor(type: AssetType)
    {
        this._filename = '';
        this._type = type;
        this.onDispose = new Signal<void>();
    }

    public get data(): any { return this._data; }
    public get filename(): string { return this._filename; }
    public get type(): AssetType { return this._type; }
    public get isLoaded(): boolean { return this._isLoaded(); }

    protected _isLoaded(): boolean { return false; }
    protected _load(filename: string, onLoadCallback: AssetLoadEvent = () => { }): boolean { return false; }

    public load(filename: string, onLoadCallback: AssetLoadEvent = () => { }): void
    {
        if (filename.length == 0) return;

        this._filename = filename;
        const data: Asset = AssetLibrary.main.get(this.type, filename);
        if (data)
        {
            this._data = data;
        }
        else 
        {
            this._load(filename, onLoadCallback);
            AssetLibrary.main.add(this.type, filename, this._data);
        }
    }

    public dispose(): void 
    {
        this.onDispose.emit();
    }
}