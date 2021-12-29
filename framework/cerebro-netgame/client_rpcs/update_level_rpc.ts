import { ClientRpc, ClientRpcSettings, RpcId, UserSession } from 'cerebro-netcore';
import NetworkLevel, { NetworkLevelId } from '../network_level';
import NetworkWorld from '../network_world';

export const rpcId: RpcId = "update_level";

export class Request
{
    public levelId: NetworkLevelId;
    public level: NetworkLevel;
}

export default class UpdatLevelRpc extends ClientRpc<Request, void>
{
    private _world: NetworkWorld;

    public constructor(world: NetworkWorld)
    {
        const settings: ClientRpcSettings = new ClientRpcSettings;

        super(rpcId, settings);

        this._world = world;
    }

    public _execute(userSession: UserSession, request: Request): void
    {
        const level: NetworkLevel = this._world.getOrCreate(request.levelId);
        level.copy(request.level);
    }
}