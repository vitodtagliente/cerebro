import { UserSession } from ".";
import Client from "./client";
import Server from "./server";

export class ComponentSettings
{

}

export type ComponentId = string;

export default abstract class Component
{
    private _id: ComponentId;
    private _settings: ComponentSettings;

    public constructor(id: ComponentId, settings: ComponentSettings = new ComponentSettings)
    {
        this._id = id;
        this._settings = settings;
    }

    public get id(): ComponentId { return this._id; }
    public get settings(): ComponentSettings { return this._settings; }

    public initialize(): boolean
    {
        return true;
    }
}

export class ClientComponent extends Component
{
    private _client: Client;

    public constructor(client: Client, id: ComponentId, settings: ComponentSettings = new ComponentSettings)
    {
        super(id, settings);
        this._client = client;
    }

    protected get client(): Client { return this._client; }
}

export class ServerComponent extends Component
{
    private _server: Server;

    public constructor(server: Server, id: ComponentId, settings: ComponentSettings = new ComponentSettings)
    {
        super(id, settings);
        this._server = server;
    }

    public get server(): Server { return this._server; }

    public onClientConnection(userSession: UserSession): void { }
    public onClientDisconnection(userSession: UserSession): void { }
}