import Texture from "./texture";
import TextureRect from "./texture_rect";

export default class TextureAtlas
{
    private _texture: Texture;
    private _sections: Map<string, TextureRect>;

    public constructor(texture: Texture, sections?: Map<string, TextureRect>)
    {
        this._texture = texture;
        this._sections = sections ? sections : new Map<string, TextureRect>();
    }

    public get texture(): Texture { return this._texture; }
    public get sections(): Map<string, TextureRect> { return this._sections; }
}