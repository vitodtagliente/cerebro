import Stats from "./stats";

export enum ItemRarity
{
    Common = 0,
    Uncommon,
    Rare,
    Epic,
    Legendary
}

export function rarityToColor(rarity: ItemRarity)
{
    switch (rarity)
    {
        case ItemRarity.Uncommon: return "green";
        case ItemRarity.Rare: return "blue";
        case ItemRarity.Epic: return "purple";
        case ItemRarity.Legendary: return "gold";
        case ItemRarity.Common:
        default:
            return "gray";
    }
}

export enum ItemType
{
    Collectible = 0,
    Consumable,
    Equipment,
}

export enum EquipmentSlotType
{
    None,
    Armor,
    Bracelets,
    Earrings,
    Helmet,
    Necklaces,
    Shield,
    Shoes,
    Weapon
}

export class EquipmentData
{
    public stats: Stats = new Stats();
    public slot: EquipmentSlotType = EquipmentSlotType.None;
    public usageLevel: number = 1;
    public level: number = 1;
}

export default class Item 
{
    public id: string = "";
    public alias: string = "";
    public name: string = "";
    public description: string = "";
    public icon: string = "";
    public image: string = "";
    public rarity: ItemRarity = ItemRarity.Common;
    public sellPrice: number = 1;
    public type: ItemType = ItemType.Collectible;
    public canStack: boolean = false;
    public equipment?: EquipmentData = null;
}