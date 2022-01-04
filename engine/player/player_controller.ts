import { GameClient } from "cerebro-netgame";
import { Input } from "../device";
import { Entity } from "../scene";

export default class PlayerController
{
    private _entity: Entity;

    public constructor()
    {

    }

    public get possessedEntity(): Entity { return this._entity; }

    public possess(entity: Entity): void 
    {
        this._entity = entity;
    }

    public update(input: Input, deltaTime: number): void 
    {

    }

    public netSerialize(client: GameClient): void 
    {

    }
}