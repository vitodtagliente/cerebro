import { InvalidNetworkId, NetworkId } from "cerebro-netcore";
import PlayerController from "./player_controller";

export default class Player
{
    private _controller: PlayerController;
    private _netId: NetworkId;
    private _username: string;

    public constructor(username: string = '')
    {
        this._controller = new PlayerController;
        this._netId = InvalidNetworkId;
        this._username = username;
    }

    public get controller(): PlayerController { return this._controller; }
    public get netId(): NetworkId { return this._netId; }
    public get username(): string { return this._username; }

    public use(controller: PlayerController): PlayerController 
    {
        this._controller = controller;
        return this._controller;
    }
}