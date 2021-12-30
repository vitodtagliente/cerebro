import Asset, { AssetType } from "./asset";

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

    public add(filename: string, asset: Asset): boolean
    {
        this._assets.set(filename, asset);
        return true;
    }

    public contains(filename: string): boolean
    {
        return this._assets.has(filename);
    }

    public get(filename: string): Asset
    {
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
        return cache.add(asset.filename, asset);
    }

    public contains(type: AssetType, filename: string): boolean
    {
        const cache: AssetCache = this._caches.get(type);
        if (cache != null)
        {
            return cache.contains(filename);
        }
        return false;
    }

    public get(type: AssetType, filename: string): Asset
    {
        const cache: AssetCache = this._caches.get(type);
        if (cache != null)
        {
            return cache.get(filename);
        }
        return null;
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