import Canvas from './canvas';

export default abstract class Device
{
    private _canvas: Canvas;

    public constructor(canvas: Canvas)
    {
        this._canvas = canvas;
    }

    protected get canvas(): Canvas { return this._canvas; }

    public abstract plugin(): boolean;
}