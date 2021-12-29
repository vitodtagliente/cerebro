import { Image } from "../asset";
import Context from "./context";
import Texture from "./texture";

export default class TextureLibrary
{
    private _context: Context;
    private _textures: Map<string, Texture>;

    public constructor(context: Context)
    {
        this._context = context;
        this._textures = new Map<string, Texture>();
    }

    public get(image: Image): Texture
    {
        if (image == null) return null;

        let texture: Texture = this._textures.get(image.filename);
        if (texture == null)
        {
            texture = new Texture(image);
            /*
            image.onDispose.on(() =>
            {
                this._textures.delete(image.filename);
            });
            */
            this._textures.set(image.filename, texture);
        }
        console.log(texture);
        return texture;
    }
}