import { ComponentRegister } from ".";
import { Image } from "../asset";
import { Renderer, Texture, TextureRect } from "../graphics";
import { Component, ComponentId } from "../scene";

class SpriteRenderer extends Component
{
    public image: Image;
    public textureRect: TextureRect;

    public static readonly id: ComponentId = 'sprite_renderer';

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

ComponentRegister.main.add(SpriteRenderer.id, SpriteRenderer);

export default SpriteRenderer;