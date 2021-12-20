import Signal from "./signal";
import Vector2 from "./vector2";

export default class Canvas
{
    private _canvas: HTMLCanvasElement;
    private _isFullscreen: boolean = false;

    public onResize: Signal<void>;

    public constructor(id: string)
    {
        this._canvas = document.getElementById(id) as HTMLCanvasElement;
        this.onResize = new Signal<void>();

        window.addEventListener('resize', () =>
        {
            if (this.isFullscreen)
            {
                this.fullscreen();
                this.onResize.emit();
            }
        });
    }

    public resize(width: number, height: number): void
    {
        if (width > 0 && height > 0)
        {
            this._canvas.width = width;
            this._canvas.height = height;
            this._isFullscreen = false;

            this.onResize.emit();
        }
    }

    public fullscreen(): void
    {
        this.resize(window.innerWidth, window.innerHeight);
        this._isFullscreen = true;
    }

    public get canvas(): HTMLCanvasElement { return this._canvas; }
    public get isFullscreen(): boolean { return this._isFullscreen; }
    public get isValid(): boolean { return this.canvas != null; }

    public get width(): number { return this.canvas.clientWidth; }
    public get height(): number { return this.canvas.clientHeight; }
    public get size(): Vector2 { return new Vector2(this.width, this.height); }
    public get pixelRatio(): number { return window.devicePixelRatio; }
}