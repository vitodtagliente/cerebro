import Stats from "./stats";
export declare enum ItemRarity {
    Common = 0,
    Uncommon = 1,
    Rare = 2,
    Epic = 3,
    Legendary = 4
}
export declare function rarityToColor(rarity: ItemRarity): "green" | "blue" | "purple" | "gold" | "gray";
export declare enum ItemType {
    Collectible = 0,
    Consumable = 1,
    Equipment = 2
}
export declare enum EquipmentSlotType {
    None = 0,
    Armor = 1,
    Bracelets = 2,
    Earrings = 3,
    Helmet = 4,
    Necklaces = 5,
    Shield = 6,
    Shoes = 7,
    Weapon = 8
}
export declare class EquipmentData {
    stats: Stats;
    slot: EquipmentSlotType;
    usageLevel: number;
    level: number;
}
export default class Item {
    id: string;
    alias: string;
    name: string;
    description: string;
    icon: string;
    image: string;
    rarity: ItemRarity;
    sellPrice: number;
    type: ItemType;
    canStack: boolean;
    equipment?: EquipmentData;
}
