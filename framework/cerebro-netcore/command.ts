import Encoding from "./encoding";
import Message, { MessageHeaderField } from "./message";
import UserSession from "./user_session";

export type CommandId = string;

export enum CommandPhase
{
    Request = 'request',
    Response = 'response'
}

export class CommandSettings
{
    public requireAuthentication: boolean = false;
    public requireResponse: boolean = true;
    public requireUserSession: boolean = false;
}

export class CommandResponse
{
    public statusCode: number;
    public data: string;

    public constructor(statusCode: number = 200, data?: string)
    {
        this.statusCode = statusCode;
        this.data = data;
    }
}

export default abstract class BaseCommand
{
    private _id: CommandId;
    private _settings: CommandSettings;

    public constructor(id: CommandId, settings: CommandSettings)
    {
        this._id = id;
        this._settings = settings;
    }

    public get id(): CommandId { return this._id; }
    public get settings(): CommandSettings { return this._settings; }

    public abstract execute(userSession: UserSession, message: Message): CommandResponse;
}

export abstract class Command<RequestType, ResponseType> extends BaseCommand
{
    public constructor(id: CommandId, settings: CommandSettings)
    {
        super(id, settings);
    }

    public execute(userSession: UserSession, message: Message): CommandResponse
    {
        console.assert(
            this.id == message.header.fields.get(MessageHeaderField.Command),
            `Cannot process the message with commandId[${message.header.fields.get(MessageHeaderField.Command)}]`
        );

        if (this.settings.requireAuthentication && userSession.authenticated == false)
        {
            console.error(`user[${userSession.user.id}] Unauthorized to run the command[${this.id}]`);
            return new CommandResponse(401); // Unauthorized
        }

        const request: RequestType = Encoding.tryParse<RequestType>(message.body);
        if (request == null)
        {
            console.error(`Failed to parse the request[${message.body}]`);
            return new CommandResponse(400); // BadRequest
        }

        const response: ResponseType = this._execute(userSession, request);
        return new CommandResponse(200, Encoding.stringify(response));
    }

    protected abstract _execute(userSession: UserSession, request: RequestType): ResponseType;
}