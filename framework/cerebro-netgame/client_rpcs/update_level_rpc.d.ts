import { ClientRpc, RpcId, UserSession } from 'cerebro-netcore';
import Level, { LevelId } from '../level';
import World from '../world';
export declare const rpcId: RpcId;
export declare class Request {
    levelId: LevelId;
    level: Level;
}
export default class UpdatLevelRpc extends ClientRpc<Request, void> {
    private _world;
    constructor(world: World);
    _execute(userSession: UserSession, request: Request): void;
}
