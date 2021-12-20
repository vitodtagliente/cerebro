import Message from "./message";
import UserSession from "./user_session";
export declare type RpcId = string;
export declare enum RpcPhase {
    Request = "request",
    Response = "response"
}
export declare class RpcSettings {
}
export declare class RpcResponse {
    statusCode: number;
    data: string;
    constructor(statusCode?: number, data?: string);
}
export default abstract class BaseRpc {
    private _id;
    private _settings;
    constructor(id: RpcId, settings: RpcSettings);
    get id(): RpcId;
    get settings(): RpcSettings;
    abstract execute(userSession: UserSession, message: Message): RpcResponse;
}
export declare class ServerRpcSettings {
    requireAuthentication: boolean;
    requireUserSession: boolean;
}
export declare abstract class ServerRpc<RequestType, ResponseType> extends BaseRpc {
    constructor(id: RpcId, settings: ServerRpcSettings);
    get settings(): ServerRpcSettings;
    execute(userSession: UserSession, message: Message): RpcResponse;
    protected abstract _execute(userSession: UserSession, request: RequestType): ResponseType;
}
export declare class ClientRpcSettings {
}
export declare abstract class ClientRpc<RequestType, ResponseType> extends BaseRpc {
    constructor(id: RpcId, settings: ClientRpcSettings);
    get settings(): ClientRpcSettings;
    execute(userSession: UserSession, message: Message): RpcResponse;
    protected abstract _execute(userSession: UserSession, request: RequestType): ResponseType;
}
