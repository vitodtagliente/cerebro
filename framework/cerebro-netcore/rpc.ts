import Encoding from "./encoding";
import Message, { MessageHeaderField } from "./message";
import UserSession from "./user_session";

export type RpcId = string;

export enum RpcPhase
{
    Request = 'request',
    Response = 'response'
}

export class RpcSettings
{

}

export class RpcResponse
{
    public statusCode: number;
    public data: string;

    public constructor(statusCode: number = 200, data?: string)
    {
        this.statusCode = statusCode;
        this.data = data;
    }
}

export default abstract class BaseRpc
{
    private _id: RpcId;
    private _settings: RpcSettings;

    public constructor(id: RpcId, settings: RpcSettings)
    {
        this._id = id;
        this._settings = settings;
    }

    public get id(): RpcId { return this._id; }
    public get settings(): RpcSettings { return this._settings; }

    public abstract execute(userSession: UserSession, message: Message): RpcResponse;
}

export class ServerRpcSettings
{
    public requireAuthentication: boolean = false;
    public requireUserSession: boolean = false;
}

export abstract class ServerRpc<RequestType, ResponseType> extends BaseRpc
{
    public constructor(id: RpcId, settings: ServerRpcSettings)
    {
        super(id, settings);
    }

    public get settings(): ServerRpcSettings { return super.settings as ServerRpcSettings; }

    public execute(userSession: UserSession, message: Message): RpcResponse
    {
        console.assert(
            this.id == message.header.fields.get(MessageHeaderField.Rpc),
            `Cannot process the rpc with id[${message.header.fields.get(MessageHeaderField.Rpc)}]`
        );

        if (this.settings.requireAuthentication && userSession.authenticated == false)
        {
            console.error(`user[${userSession.user.id}] Unauthorized to run the rpc[${this.id}]`);
            return new RpcResponse(401); // Unauthorized
        }

        const request: RequestType = Encoding.tryParse<RequestType>(message.body);
        if (request == null)
        {
            console.error(`Failed to parse the request[${message.body}]`);
            return new RpcResponse(400); // BadRequest
        }

        const response: ResponseType = this._execute(userSession, request);
        return new RpcResponse(200, Encoding.stringify(response));
    }

    protected abstract _execute(userSession: UserSession, request: RequestType): ResponseType;
}

export class ClientRpcSettings
{

}

export abstract class ClientRpc<RequestType, ResponseType> extends BaseRpc
{
    public constructor(id: RpcId, settings: ClientRpcSettings)
    {
        super(id, settings);
    }

    public get settings(): ClientRpcSettings { return super.settings as ClientRpcSettings; }

    public execute(userSession: UserSession, message: Message): RpcResponse
    {
        console.assert(
            this.id == message.header.fields.get(MessageHeaderField.Rpc),
            `Cannot process the rpc with id[${message.header.fields.get(MessageHeaderField.Rpc)}]`
        );

        const request: RequestType = Encoding.tryParse<RequestType>(message.body);
        if (request == null)
        {
            console.error(`Failed to parse the request[${message.body}]`);
            return new RpcResponse(400); // BadRequest
        }

        const response: ResponseType = this._execute(userSession, request);
        return new RpcResponse(200, Encoding.stringify(response));
    }

    protected abstract _execute(userSession: UserSession, request: RequestType): ResponseType;
}