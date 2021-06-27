import WorldMap from "./world_map";


export default class World
{
    private static _main: World = null;
    public static get main(): World { return World._main; }

    private _maps: Array<WorldMap>;

    public constructor()
    {
        World._main = this;
        this._maps = [];
    }

    public get maps(): Array<WorldMap> { return this._maps; }
}