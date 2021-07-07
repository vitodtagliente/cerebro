import Command, { CommandId, CommandPhase, CommandResponse } from "./command";
import CommandRegister from "./command_register";
import Encoding from "./encoding";
import Message, { MessageHeaderField } from "./message";
import NetworkId from "./network_id";
import TimeMap from "./time_map";
import UserSession from "./user_session";

type ResponseHandler<ResponseType> = (error: number, response?: ResponseType) => void;

export default class CommandProcessor
{
    private _register: CommandRegister;
    private _requests: TimeMap<NetworkId, Function>;

    public constructor()
    {
        this._register = new CommandRegister;
        this._requests = new TimeMap<NetworkId, Function>(20000); // 20s
    }

    public get register(): CommandRegister { return this._register; }

    public process(userSession: UserSession, message: Message): Message
    {
        this._requests.tick();

        if (message.header.fields.has(MessageHeaderField.Command) == false)
        {
            return;
        }

        const commandId: CommandId = message.header.fields.get(MessageHeaderField.Command);
        const command: Command = this.register.find(commandId);
        if (command == null)
        {
            console.log(`Cannot find a command ${commandId} for processing the message '${message}'`);
            return;
        }

        const commandResponse: CommandResponse = command.execute(userSession, message);

        // is it my request?
        // if yes, execute the callback
        const requestId: NetworkId = message.header.id;
        if (this._requests.has(requestId))
        {
            const callback: Function = this._requests.get(requestId);
            this._requests.delete(requestId);

            if (callback && message.header.fields.get(MessageHeaderField.CommandPhase) == CommandPhase.Response)
            {
                // callback(commandResponse.statusCode, commandResponse.data);
                callback(commandResponse.statusCode);
            }
        }
        // if no, send the command response to the requester
        else
        {
            if (command.settings.requireResponse)
            {
                // encode the response
                const responseMessage: Message = new Message;
                responseMessage.header = message.header;
                message.header.fields.set(MessageHeaderField.CommandPhase, CommandPhase.Response);
                responseMessage.body = Encoding.stringify(CommandResponse);
                return responseMessage;
            }
        }

        return null;
    }

    public request<RequestType, ResponseType>(commandId: CommandId, request: RequestType, callback: ResponseHandler<ResponseType>): Message
    {
        const command: Command = this.register.find(commandId);
        if (command == null)
        {
            console.error(`Cannot find the command[${commandId}]`);
            return null;
        }

        // encode the request
        const message: Message = new Message;
        message.header.fields.set(MessageHeaderField.Command, commandId);
        message.header.fields.set(MessageHeaderField.CommandPhase, CommandPhase.Request);
        message.body = Encoding.stringify(request);

        if (command.settings.requireResponse)
        {
            this._requests.set(message.header.id, callback);
        }

        return message;
    }
}