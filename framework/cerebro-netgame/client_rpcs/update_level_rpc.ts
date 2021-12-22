import { ClientRpc, ClientRpcSettings, RpcId, UserSession } from 'cerebro-netcore';
import Level, { LevelId } from '../level';
import World from '../world';

export const rpcId: RpcId = "update_level";

export class Request
{
    public levelId: LevelId;
    public level: Level;
}

export default class UpdatLevelRpc extends ClientRpc<Request, void>
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
        const level: Level = this._world.getOrCreate(request.levelId);
        level.copyFrom(request.level);
    }
}