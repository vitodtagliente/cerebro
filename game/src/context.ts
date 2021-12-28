import Canvas from './canvas';
import Color from './color';
import Texture from './texture';
import TextureRect from './texture_rect';
import Vector2 from './vector2';

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

    public drawTexture(position: Vector2, texture: Texture): void 
    {
        this._ctx.drawImage(texture.data, position.x, position.y);
    }

    public drawSubTexture(position: Vector2, texture: Texture, rect: TextureRect, scale: Vector2 = Vector2.one()): void
    {
        this._ctx.drawImage(
            texture.data,
            rect.x * texture.data.width,
            rect.y * texture.data.height,
            rect.width * texture.data.width,
            rect.height * texture.data.height,
            position.x,
            position.y,
            rect.width * texture.data.width * scale.x,
            rect.height * texture.data.height * scale.y
        )
    }
}