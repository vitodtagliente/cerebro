import Encoding from "./encoding";
import Message, { MessageHeaderField } from "./message";
import NetworkId from "./network_id";
import BaseRpc, { RpcId, RpcPhase, RpcResponse } from "./rpc";
import RpcRegister from "./rpc_register";
import TimeMap from "./time_map";
import UserSession from "./user_session";

type ResponseHandler = (rpcResponse: RpcResponse) => void;

export default class RpcProcessor
{
    private _register: RpcRegister;
    private _requests: TimeMap<NetworkId, ResponseHandler>;

    public constructor()
    {
        this._register = new RpcRegister;
        this._requests = new TimeMap<NetworkId, ResponseHandler>(20000); // 20s
        this._requests.onExpire = (responseHandler: ResponseHandler) =>
        {
            responseHandler(null);
        };
    }

    public get register(): RpcRegister { return this._register; }

    public process(userSession: UserSession, message: Message): Message
    {
        this._requests.tick();

        if (message.header.fields.has(MessageHeaderField.Rpc) == false)
        {
            return;
        }

        const rpcId: RpcId = message.header.fields.get(MessageHeaderField.Rpc);
        const rpc: BaseRpc = this.register.find(rpcId);
        if (rpc == null)
        {
            console.log(`Cannot find the rpc ${rpcId} for processing the message '${message}'`);
            return;
        }

        // is it my request?
        // if yes, execute the callback
        const requestId: NetworkId = message.header.id;
        if (this._requests.has(requestId))
        {
            const callback: Function = this._requests.get(requestId);
            this._requests.delete(requestId);

            if (callback && message.header.fields.get(MessageHeaderField.RpcPhase) == RpcPhase.Response)
            {
                const rpcResponse: RpcResponse = Encoding.tryParse<RpcResponse>(message.body);
                callback(rpcResponse);
            }
        }
        // if no, send the rpc response to the requester
        else
        {
            const rpcResponse: RpcResponse = rpc.execute(userSession, message);
            if (rpcResponse.data) // void return type will be an empty string
            {
                // encode the response
                const responseMessage: Message = new Message;
                responseMessage.header = message.header;
                message.header.fields.set(MessageHeaderField.RpcPhase, RpcPhase.Response);
                responseMessage.body = Encoding.stringify(rpcResponse);
                return responseMessage;
            }
        }

        return null;
    }

    public request<RequestType>(rpcId: RpcId, request: RequestType, callback: ResponseHandler): Message
    {
        // encode the request
        const message: Message = new Message;
        message.header.fields.set(MessageHeaderField.Rpc, rpcId);
        message.header.fields.set(MessageHeaderField.RpcPhase, RpcPhase.Request);
        message.body = Encoding.stringify(request);

        const rpc: BaseRpc = this.register.find(rpcId);
        if (rpc)
        {            
            this._requests.set(message.header.id, callback);
        }

        return message;
    }
}