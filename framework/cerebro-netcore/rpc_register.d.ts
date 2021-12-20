import BaseRpc, { RpcId } from "./rpc";
export default class RpcRegister {
    private _rpcs;
    constructor();
    get rpcs(): Map<RpcId, BaseRpc>;
    add(rpc: BaseRpc): void;
    delete(rpcId: RpcId): void;
    find(rpcId: RpcId): BaseRpc;
    has(rpcId: RpcId): boolean;
}
