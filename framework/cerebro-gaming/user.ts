import { Transform } from "stream";
import Endpoint from "./endpoint";

export class Pawn
{
    public constructor()
    {
        this.transform = new Transform;
        this.data = new Map<string, any>();
    }

    public name: string;
    public transform: Transform;
    public data: Map<string, any>;
}

export class UserState
{
    public constructor()
    {
        this.authenticated = false;
        this.pawn = new Pawn;
        this.data = new Map<string, any>();
    }

    public authenticated: boolean;
    public pawn: Pawn = new Pawn;
    public data: Map<string, any>;
}

export type UniqueId = string;
export const InvalidUniqueId: UniqueId = "";

export class User
{
    public constructor()
    {
        this.uniqueId = InvalidUniqueId;
        this.endpoint = new Endpoint(Endpoint.InvalidAddress, Endpoint.InvalidPort);
        this.state = new UserState;
    }

    public uniqueId: UniqueId;
    public endpoint: Endpoint;
    public state: UserState;
}