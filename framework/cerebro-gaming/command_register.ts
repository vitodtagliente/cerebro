import Command from "./command";


export default class CommandRegister
{
    private _commands: Map<string, Command>;

    public constructor()
    {
        this._commands = new Map<string, Command>();
    }


}