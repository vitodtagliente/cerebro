import User from "./user";

export default class UserSession
{
    public constructor()
    {
        this.authenticated = false;
        this.user = new User;
        this.data = new Map<string, string>();
    }

    public authenticated: boolean;
    public user: User;
    public data: Map<string, string>;
}