import { Image } from "../asset";
import { Renderer, Texture, TextureRect } from "../graphics";
import { Component } from "../scene";

export default class SpriteRenderer extends Component
{
    public image: Image;
    public textureRect: TextureRect;

    public constructor()
    {
        super();
        this.textureRect = new TextureRect();
    }

    public render(renderer: Renderer): void 
    {
        super.render(renderer);

        const texture: Texture = new Texture(this.image);
        
        renderer.context.drawSubTexture(
            this.owner.transform.position,
            texture,
            this.textureRect,
            this.owner.transform.scale
        );
    }
}