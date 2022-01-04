import { RpcId, ServerRpc, UserSession } from 'cerebro-netcore';
import { NetworkMath } from '../network_math';
import NetworkWorld from '../network_world';
export declare const rpcId: RpcId;
export declare class Request {
    level: string;
    transform: NetworkMath.Transform;
    animation: string;
}
export default class MoveRpc extends ServerRpc<Request, void> {
    private _world;
    constructor(world: NetworkWorld);
    _execute(userSession: UserSession, request: Request): void;
}
