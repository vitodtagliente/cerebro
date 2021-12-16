import { UserSession } from ".";
import Client from "./client";
import Server from "./server";
export declare class ComponentSettings {
}
export declare type ComponentId = string;
export default abstract class Component {
    private _id;
    private _settings;
    constructor(id: ComponentId, settings?: ComponentSettings);
    get id(): ComponentId;
    get settings(): ComponentSettings;
    initialize(): boolean;
}
export declare class ClientComponent extends Component {
    private _client;
    constructor(client: Client, id: ComponentId, settings?: ComponentSettings);
    protected get client(): Client;
}
export declare class ServerComponent extends Component {
    private _server;
    constructor(server: Server, id: ComponentId, settings?: ComponentSettings);
    protected get server(): Server;
    onClientConnection(userSession: UserSession): void;
    onClientDisconnection(userSession: UserSession): void;
}
