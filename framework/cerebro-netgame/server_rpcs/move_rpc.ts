import { Encoding, InvalidNetworkId, NetworkId, RpcId, ServerRpc, ServerRpcSettings, UserSession } from 'cerebro-netcore';
import Level from '../level';
import { Math } from '../math';
import NetworkObject from '../network_object';
import { UserProperty } from '../user_property';
import World from '../world';

export const rpcId: RpcId = "move";

export class Request
{
    public level: string;
    public transform: Math.Transform;
}

export default class MoveRpc extends ServerRpc<Request, void>
{
    private _world: World;

    public constructor(world: World)
    {
        const settings: ServerRpcSettings = new ServerRpcSettings;
        settings.requireAuthentication = false;
        settings.requireUserSession = true;

        super(rpcId, settings);

        this._world = world;
    }

    public _execute(userSession: UserSession, request: Request): void
    {
        const level: Level = this._world.get(request.level);
        if (level == null)
        {
            console.error(`user[${userSession.user.id}] is moving into a not valid level[${request.level}]`);
            return;
        }

        const objectId: NetworkId = userSession.data.as<NetworkId>(UserProperty.PossessedObject);
        if (objectId == InvalidNetworkId)
        {
            console.error(`user[${userSession.user.id}] does not have a valid possessed game object`);
            return;
        }

        const possessedObject: NetworkObject = level.get(objectId);
        if (possessedObject == null)
        {
            console.error(`user[${userSession.user.id}] - cannot find the object[${objectId}]`);
            return;
        }

        possessedObject.transform.position.selfSum(request.transform.position);
    }
}