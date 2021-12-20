import { ClientRpc, ClientRpcSettings, Encoding, InvalidNetworkId, NetworkId, RpcId, UserSession } from 'cerebro-netcore';
import Level from '../level';
import { Math } from '../math';
import NetworkObject from '../network_object';
import { UserProperty } from '../user_property';
import World from '../world';

export const rpcId: RpcId = "update_world";

export class Request
{
    public world: World;
}

export default class UpdateWorldRpc extends ClientRpc<Request, void>
{
    private _world: World;

    public constructor(world: World)
    {
        const settings: ClientRpcSettings = new ClientRpcSettings;

        super(rpcId, settings);

        this._world = world;
    }

    public _execute(userSession: UserSession, request: Request): void
    {
        this._world = request.world;
    }
}