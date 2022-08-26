export enum StatType
{
    First = 0,
    Strength = First, // increases physical damage dealt
    Intelligence, // increases magical damage dealt
    Defense, // physical damage reduction
    Resistance, // magic damage reduction
    Dexterity, // hit accuracy
    Luck, // crit chance
    Agility, // evasion rate
    Count
}

export default class Stats 
{
    private _data: Map<StatType, number> = new Map<StatType, number>();

    public constructor()
    {

    }

    public get(type: StatType): number
    {
        if (this._data.has(type))
            return this._data.get(type);
        return 0;
    }

    public sum(stats: Stats): Stats
    {
        var result: Stats = this;
        for (const [key, value] of stats._data)
        {
            if (result._data.has(key))
            {
                result._data.set(key, result.get(key));
            }
            else 
            {
                result._data.set(key, value);
            }
        }
        return result;
    }
}