import { Canvas } from "../application";
import { Vector2 } from "../math";
import Color from "./color";
import Texture from "./texture";
import TextureRect from "./texture_rect";

export default class Context
{
    private _canvas: Canvas;
    private _ctx: CanvasRenderingContext2D;

    public constructor(canvas: Canvas)
    {
        this._canvas = canvas;
        canvas.fullscreen();
        this._ctx = canvas.canvas.getContext('2d') as CanvasRenderingContext2D;
    }

    public get canvas(): Canvas { return this._canvas; }

    public clear(color: Color): void
    {
        this._ctx.fillStyle = color.hex;
        this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
    }

    public drawRect(position: Vector2, width: number, height: number, color: Color): void 
    {

    }

    public drawCircle(position: Vector2, radius: number, color: Color): void
    {
        this._ctx.fillStyle = color.rgba;
        this._ctx.beginPath();
        this._ctx.arc(position.x, position.y, radius, 0, Math.PI * 2);
        this._ctx.fill();
    }

    public strokeCircle(position: Vector2, radius: number, color: Color): void
    {
        this._ctx.strokeStyle = color.rgba;
        this._ctx.beginPath();
        this._ctx.arc(position.x, position.y, radius, 0, Math.PI * 2);
        this._ctx.stroke();
    }

    public drawTexture(position: Vector2, texture: Texture): void 
    {
        if (texture == null
            || texture.image == null
            || texture.image.isLoaded == false) return;

        this._ctx.drawImage(texture.image.data, position.x, position.y);
    }

    public drawSubTexture(position: Vector2, texture: Texture, rect: TextureRect, scale: Vector2 = Vector2.one): void
    {
        if (texture == null
            || texture.image == null
            || texture.image.isLoaded == false) return;

        this._ctx.drawImage(
            texture.image.data,
            rect.x * texture.image.width,
            rect.y * texture.image.height,
            rect.width * texture.image.width,
            rect.height * texture.image.height,
            position.x,
            position.y,
            rect.width * texture.image.width * scale.x,
            rect.height * texture.image.height * scale.y
        )
    }
}