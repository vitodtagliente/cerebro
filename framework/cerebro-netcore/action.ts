import Encoding from "./encoding";
import Message, { MessageHeaderField } from "./message";
import UserSession from "./user_session";

export type ActionId = string;

export class ActionSettings
{
    public requireAuthentication: boolean = false;
    public requireUserSession: boolean = false;
}

export default abstract class BaseAction
{
    private _id: ActionId;
    private _settings: ActionSettings;

    public constructor(id: ActionId, settings: ActionSettings)
    {
        this._id = id;
        this._settings = settings;
    }

    public get id(): ActionId { return this._id; }
    public get settings(): ActionSettings { return this._settings; }

    public abstract execute(userSession: UserSession, message: Message): void;
}

export abstract class Action<RequestType> extends BaseAction
{
    public constructor(id: ActionId, settings: ActionSettings)
    {
        super(id, settings);
    }

    public execute(userSession: UserSession, message: Message): void
    {
        console.assert(
            this.id == message.header.fields.get(MessageHeaderField.Action),
            `Cannot process the message with actionId[${message.header.fields.get(MessageHeaderField.Action)}]`
        );

        if (this.settings.requireAuthentication && userSession.authenticated == false)
        {
            console.error(`user[${userSession.user.id}] Unauthorized to run the action[${this.id}]`); // Unauthorized
            return;
        }

        const request: RequestType = Encoding.tryParse<RequestType>(message.body);
        if (request == null)
        {
            console.error(`Failed to parse the request[${message.body}]`); // BadRequest
            return; 
        }

        this._execute(userSession, request);
    }

    protected abstract _execute(userSession: UserSession, request: RequestType): void;
}