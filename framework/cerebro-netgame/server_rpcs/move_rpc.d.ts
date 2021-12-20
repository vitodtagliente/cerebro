import { RpcId, ServerRpc, UserSession } from 'cerebro-netcore';
import { Math } from '../math';
import World from '../world';
export declare const rpcId: RpcId;
export declare class Request {
    level: string;
    transform: Math.Transform;
}
export default class MoveRpc extends ServerRpc<Request, void> {
    private _world;
    constructor(world: World);
    _execute(userSession: UserSession, request: Request): void;
}
