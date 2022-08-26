export declare enum StatType {
    First = 0,
    Strength = 0,
    Intelligence = 1,
    Defense = 2,
    Resistance = 3,
    Dexterity = 4,
    Luck = 5,
    Agility = 6,
    Count = 7
}
export default class Stats {
    private _data;
    constructor();
    get(type: StatType): number;
    sum(stats: Stats): Stats;
}
