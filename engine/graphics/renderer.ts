import { TextureLibrary } from ".";
import Context from "./context";

export default class Renderer
{
    private _context: Context;
    private _textureLibary: TextureLibrary;

    public constructor(context: Context)
    {
        this._context = context;
        this._textureLibary = new TextureLibrary(context);
    }

    public get context(): Context { return this._context; }
    public get textureLibrary(): TextureLibrary { return this._textureLibary; }

    public begin(): void 
    {

    }

    public commit(): void 
    {

    }
}