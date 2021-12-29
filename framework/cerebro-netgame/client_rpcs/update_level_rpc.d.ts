import { ClientRpc, RpcId, UserSession } from 'cerebro-netcore';
import NetworkLevel, { NetworkLevelId } from '../network_level';
import NetworkWorld from '../network_world';
export declare const rpcId: RpcId;
export declare class Request {
    levelId: NetworkLevelId;
    level: NetworkLevel;
}
export default class UpdatLevelRpc extends ClientRpc<Request, void> {
    private _world;
    constructor(world: NetworkWorld);
    _execute(userSession: UserSession, request: Request): void;
}
