import Message from "./message";
import { RpcId, RpcResponse } from "./rpc";
import RpcRegister from "./rpc_register";
import UserSession from "./user_session";
declare type ResponseHandler = (rpcResponse: RpcResponse) => void;
export default class RpcProcessor {
    private _register;
    private _requests;
    constructor();
    get register(): RpcRegister;
    process(userSession: UserSession, message: Message): Message;
    request<RequestType>(rpcId: RpcId, request: RequestType, callback: ResponseHandler): Message;
}
export {};
