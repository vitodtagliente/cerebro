import { ClientRpc, RpcId, UserSession } from 'cerebro-netcore';
import Level from '../level';
import World from '../world';
export declare const rpcId: RpcId;
export declare class Request {
    level: Level;
}
export default class UpdatLevelRpc extends ClientRpc<Request, void> {
    private _world;
    constructor(world: World);
    _execute(userSession: UserSession, request: Request): void;
}
