import BaseCommand, { CommandId, CommandPhase, CommandResponse } from "./command";
import CommandRegister from "./command_register";
import Encoding from "./encoding";
import Message, { MessageHeaderField } from "./message";
import NetworkId from "./network_id";
import TimeMap from "./time_map";
import UserSession from "./user_session";

type ResponseHandler = (commandResponse: CommandResponse) => void;

export default class CommandProcessor
{
    private _register: CommandRegister;
    private _requests: TimeMap<NetworkId, ResponseHandler>;

    public constructor()
    {
        this._register = new CommandRegister;
        this._requests = new TimeMap<NetworkId, ResponseHandler>(20000); // 20s
        this._requests.onExpire = (responseHandler: ResponseHandler) =>
        {
            responseHandler(null);
        };
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
        const command: BaseCommand = this.register.find(commandId);
        if (command == null)
        {
            console.log(`Cannot find a command ${commandId} for processing the message '${message}'`);
            return;
        }

        // is it my request?
        // if yes, execute the callback
        const requestId: NetworkId = message.header.id;
        if (this._requests.has(requestId))
        {
            const callback: Function = this._requests.get(requestId);
            this._requests.delete(requestId);

            if (callback && message.header.fields.get(MessageHeaderField.CommandPhase) == CommandPhase.Response)
            {
                const commandResponse: CommandResponse = Encoding.tryParse<CommandResponse>(message.body);
                callback(commandResponse);
            }
        }
        // if no, send the command response to the requester
        else
        {
            const commandResponse: CommandResponse = command.execute(userSession, message);
            if (command.settings.requireResponse)
            {
                // encode the response
                const responseMessage: Message = new Message;
                responseMessage.header = message.header;
                message.header.fields.set(MessageHeaderField.CommandPhase, CommandPhase.Response);
                responseMessage.body = Encoding.stringify(commandResponse);
                return responseMessage;
            }
        }

        return null;
    }

    public request<RequestType>(commandId: CommandId, request: RequestType, callback: ResponseHandler): Message
    {
        const command: BaseCommand = this.register.find(commandId);
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