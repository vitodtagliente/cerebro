import { Signal } from "../core";
import AssetLibrary from "./asset_library";

export enum AssetType
{
    Audio,
    Image,
    Prefab,
    Scene
}

export default abstract class Asset 
{
    protected _data: any;
    private _filename: string;
    private _type: AssetType;

    public onDispose: Signal<void>;
    public onLoad: Signal<void>;

    public constructor(type: AssetType)
    {
        this._filename = '';
        this._type = type;
        this.onDispose = new Signal<void>();
        this.onLoad = new Signal<void>();
    }

    public get data(): any { return this._data; }
    public get filename(): string { return this._filename; }
    public get type(): AssetType { return this._type; }
    public get isLoaded(): boolean { return this._isLoaded(); }

    protected _isLoaded(): boolean { return false; }
    protected _load(filename: string): boolean { return false; }

    public load(filename: string): void
    {
        if (filename.length == 0) return;

        this._filename = filename;
        this._load(filename);

        if (AssetLibrary.main.has(this.type, filename) == false)
        {
            AssetLibrary.main.add(this);
        }
    }

    public dispose(): void 
    {
        this.onDispose.emit();
    }
}