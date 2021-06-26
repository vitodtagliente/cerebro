
export class User
{

}

export default class UserManager
{
    private _users: Array<User> = [];

    public construct()
    {
        
    }

    public get users(): Array<User> { return this._users; }
}