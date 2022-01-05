import { ComponentRegister } from ".";
import { AssetLibrary, Image } from "../asset";
import { AssetType } from "../asset/asset";
import { Color, Renderer, Texture, TextureRect } from "../graphics";
import { Component, ComponentId } from "../scene";

class SpriteRenderer extends Component
{
    public debug: boolean;
    public image: Image;
    public textureRect: TextureRect;

    public static readonly id: ComponentId = 'sprite_renderer';

    public constructor()
    {
        super();
        this.debug = true;
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

        if (this.debug)
        {
            const width: number = texture.image.width * this.textureRect.width * this.owner.transform.scale.x;
            const height: number = texture.image.height * this.textureRect.height * this.owner.transform.scale.y;

            renderer.context.strokeRect(
                this.owner.transform.position,
                width,
                height,
                Color.green
            );
        }
    }

    public serialize(): any 
    {
        return {
            'type': SpriteRenderer.id,
            'image': this.image ? this.image.filename : null,
            'texturRect': this.textureRect.serialize()
        };
    }

    public deserialize(data: any): void 
    {
        for (const key of Object.keys(data))
        {
            switch (key)
            {
                case 'image': this.image = AssetLibrary.main.get(AssetType.Image, data[key]) as Image; break;
                case 'textureRect': this.textureRect.deserialize(data[key]); break;
            }
        }
    }
}

ComponentRegister.main.add(SpriteRenderer.id, SpriteRenderer);

export default SpriteRenderer;