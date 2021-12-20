import BaseRpc, { RpcId } from "./rpc";

export default class RpcRegister
{
    private _rpcs: Map<RpcId, BaseRpc>;

    public constructor()
    {
        this._rpcs = new Map<RpcId, BaseRpc>();
    }

    public get rpcs(): Map<RpcId, BaseRpc> { return this._rpcs; }

    public add(rpc: BaseRpc): void
    {
        this._rpcs.set(rpc.id, rpc);
    }

    public delete(rpcId: RpcId): void
    {
        this._rpcs.delete(rpcId);
    }

    public find(rpcId: RpcId): BaseRpc
    {
        return this._rpcs.get(rpcId);
    }

    public has(rpcId: RpcId): boolean
    {
        return this._rpcs.has(rpcId);
    }
}