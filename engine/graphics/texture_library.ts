import { Image } from "../asset";
import Context from "./context";
import Texture from "./texture";

export default class TextureLibrary
{
    private _context: Context;
    private _textures: Map<number, Texture>;

    public constructor(context: Context)
    {
        this._context = context;
        this._textures = new Map<number, Texture>();
    }

    public get textures(): Map<number, Texture> { return this._textures; }

    public get(image: Image): Texture
    {
        /*
        let texture: Texture = this._textures.get(image.filename);
        if (texture == null && this._context != null)
        {
            texture = this._context.createTexture(image);
            this._textures.set(image.id, texture);
            image.onDispose.on((asset: AssetData) =>
            {
                this._textures.delete(asset.id);
            });
        }
        return texture;
        */
        return null;
    }
}