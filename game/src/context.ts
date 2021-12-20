import Canvas from './canvas';
import Color from './color';
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
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    public drawCircle(position: Vector2, radius: number, color: Color): void
    {
        this._ctx.fillStyle = color.rgba;
        this._ctx.beginPath();
        this._ctx.arc(position.x, position.y, radius, 0, Math.PI * 2);
        this._ctx.closePath();
    }
}