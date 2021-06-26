import Endpoint from "./endpoint";
import UserManager, { User } from "./user_manager";

export default class MessageProcessor
{
    private _userManager: UserManager;

    public constructor(userManager: UserManager)
    {
        this._userManager = userManager;
    }

    public process(endpoint: Endpoint, message: string): void
    {
        const user: User = this._userManager.findByEndpoint(endpoint);
        if (user)
        {

        }
    }
}