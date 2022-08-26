import Stats from "./stats";
export declare class CharacterStatus {
    health: number;
    mana: number;
}
export default class Character {
    id: string;
    name: string;
    health: number;
    mana: number;
    sprite: string;
    stats: Stats;
    status: CharacterStatus;
    constructor();
}
