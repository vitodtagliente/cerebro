import { Log } from "cerebro-core";
import { Item } from "libgame";
import * as Items from "../assets/items"

class Cache
{
    private static _main: Cache = null;
    public static get main(): Cache
    {
        if (Cache._main == null)
        {
            Cache._main = new Cache();
        }
        return Cache._main;
    }

    public items: Map<string, Item> = new Map<string, Item>();

    public empty(): boolean
    {
        return this.items.size == 0;
    }

    public clear(): void
    {
        this.items.clear();
    }

    private constructor() { }
}

export default class ItemDefinitionModule
{
    public constructor()
    {

    }

    public static load(): void
    {
        // inject the data into the cache
        // in theory from the DB
        for (const item of Items.default)
        {
            Cache.main.items.set(item["alias"], Object.assign(new Item, item));
        }
    }

    public all(): Array<Item>
    {
        return Array.from(Cache.main.items.values());
    }

    public find(alias: string): Item
    {
        const item: Item = Cache.main.items.get(alias);
        if (item == null)
        {
            Log.Logger.warn(`Cannot find the item ${alias}`);
        }
        return item;
    }

    public filter(filter: string): Array<Item>
    {
        return [];
    }
}