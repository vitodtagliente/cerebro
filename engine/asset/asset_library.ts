import Asset, { AssetType } from "./asset";

class AssetCache
{
    private _type: AssetType;
    private _caches: Map<string, Asset>;

    public constructor(type: AssetType)
    {
        this._type = type;
        this._caches = new Map<string, Asset>();
    }

    public get type(): AssetType { return this._type; }

    public add(filename: string, asset: Asset): boolean
    {
        this._caches.set(filename, asset);
        return true;
    }

    public get(filename: string): Asset
    {
        return this._caches.get(filename);
    }

    public dispose(filename: string): void 
    {
        const asset: Asset = this.get(filename);
        if (asset != null)
        {
            asset.dispose();
            this._caches.delete(filename);
        }
    }

    public clear(): void 
    {
        for (const [filename, asset] of this._caches)
        {
            asset.dispose();
        }
        this._caches.clear();
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

    public add(type: AssetType, filename: string, asset: Asset): boolean
    {
        let cache: AssetCache = this._caches.get(type);
        if (cache == null)
        {
            cache = new AssetCache(type);
            this._caches.set(type, cache);
        }
        return cache.add(filename, asset);
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