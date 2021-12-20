import { ClientRpc, RpcId, UserSession } from 'cerebro-netcore';
import World from '../world';
export declare const rpcId: RpcId;
export declare class Request {
    world: World;
}
export default class UpdateWorldRpc extends ClientRpc<Request, void> {
    private _world;
    constructor(world: World);
    _execute(userSession: UserSession, request: Request): void;
}
