import { Audio, Image, Prefab, Scene } from ".";
import Asset, { AssetType } from "./asset";

function instantiate(type: AssetType): Asset
{
    switch (type)
    {
        case AssetType.Audio: return new Audio();
        case AssetType.Image: return new Image();
        case AssetType.Prefab: return new Prefab();
        case AssetType.Scene: return new Scene();
        default: return null;
    }
}

class AssetCache
{
    private _type: AssetType;
    private _assets: Map<string, Asset>;

    public constructor(type: AssetType)
    {
        this._type = type;
        this._assets = new Map<string, Asset>();
    }

    public get type(): AssetType { return this._type; }

    public add(asset: Asset): boolean
    {
        this._assets.set(asset.filename, asset);
        return true;
    }

    public has(filename: string): boolean
    {
        return this._assets.has(filename);
    }

    public get(filename: string): Asset
    {
        if (!this.has(filename))
        {
            const asset: Asset = instantiate(this.type);
            asset.load(filename);
            this.add(asset);
            return asset;
        }
        return this._assets.get(filename);
    }

    public dispose(filename: string): void 
    {
        const asset: Asset = this.get(filename);
        if (asset != null)
        {
            asset.dispose();
            this._assets.delete(filename);
        }
    }

    public clear(): void 
    {
        for (const [filename, asset] of this._assets)
        {
            asset.dispose();
        }
        this._assets.clear();
    }
}

export default class AssetLibrary
{
    private static _main: AssetLibrary;
    public static get main(): AssetLibrary
    {
        if (AssetLibrary._main == null)
        {
            AssetLibrary._main = new AssetLibrary();
        }
        return AssetLibrary._main;
    }

    private _caches: Map<AssetType, AssetCache>;

    private constructor()
    {
        console.assert(AssetLibrary._main == null);
        this._caches = new Map<AssetType, AssetCache>();
    }

    public add(asset: Asset): boolean
    {
        let cache: AssetCache = this._caches.get(asset.type);
        if (cache == null)
        {
            cache = new AssetCache(asset.type);
            this._caches.set(asset.type, cache);
        }
        return cache.add(asset);
    }

    public has(type: AssetType, filename: string): boolean
    {
        const cache: AssetCache = this._caches.get(type);
        if (cache != null)
        {
            return cache.has(filename);
        }
        return false;
    }

    public get(type: AssetType, filename: string): Asset
    {
        let cache: AssetCache = this._caches.get(type);
        if (cache == null)
        {
            cache = new AssetCache(type);
            this._caches.set(type, cache);
        }
        return cache.get(filename);
    }

    public clear(type?: AssetType | null): void 
    {
        if (type != null)
        {
            const cache: AssetCache = this._caches.get(type);
            if (cache != null)
            {
                cache.clear();
            }
        }
        else 
        {
            for (const [type, cache] of this._caches)
            {
                cache.clear();
            }
        }
    }
}