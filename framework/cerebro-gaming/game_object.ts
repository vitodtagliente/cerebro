import NetworkId, { nextNetworkId } from "./network_id";
import { Transform } from "./math";

export default class GameObject
{
    public constructor()
    {
        this.networkId = nextNetworkId();
        this.transform = new Transform;
    }

    public networkId: NetworkId;
    public transform: Transform;
}