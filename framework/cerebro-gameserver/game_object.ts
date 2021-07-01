import { NetworkId, nextNetworkId } from "../cerebro-netcore";
import { Transform } from "./math";
import User from "./user";

export class GameObjectState
{
    public constructor()
    {
        this.user = null;
        this.data = new Map<string, any>();
    }

    public user: User;
    public data: Map<string, any>;

    public get isUserControlled() { return this.user != null; }
}

export default class GameObject
{
    public constructor()
    {
        this.id = nextNetworkId();
        this.transform = new Transform;
        this.state = new GameObjectState;
    }

    public id: NetworkId;
    public prefabId: string;
    public transform: Transform;
    public state: GameObjectState;
}