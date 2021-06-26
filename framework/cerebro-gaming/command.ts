import Message from "./message";

class Config
{

}

export default class Command
{
    public readonly Config: Config;

    private _message: Message;

    public constructor(message: Message)
    {
        this._message = message;
    }

    public get message(): Message { return this._message; }
}