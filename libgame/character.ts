import Stats from "./stats";

export class CharacterStatus
{
    public health: number = 10;
    public mana: number = 10;
}

export default class Character
{
    public id: string = "";
    public name: string = "";
    public health: number = 10;
    public mana: number = 10;
    public sprite: string = "";
    public stats: Stats = new Stats;
    public status: CharacterStatus = new CharacterStatus();

    public constructor()
    {

    }
}