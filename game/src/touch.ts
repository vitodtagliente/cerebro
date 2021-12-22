import Canvas from "./canvas";
import Device from "./device";
import KeyCode from "./keyboard";
import Signal from "./signal";
import Vector2 from "./vector2";

export default class Touch extends Device
{
    private _isDown: boolean;
    private _position: Vector2;
    private _startTouching: Vector2;
    private _direction: Vector2;

    public onTouch: Signal<void>;

    public constructor(canvas: Canvas)
    {
        super(canvas);
        this._isDown = false;
        this._position = Vector2.zero();
        this._startTouching = Vector2.zero();
        this._direction = Vector2.zero();

        this.onTouch = new Signal<void>();
    }

    public get position(): Vector2 { return this._position; }
    public get direction(): Vector2 { return this._direction; }
    public get isDown(): boolean { return this._isDown; }

    public release(): void 
    {
        this._isDown = false;
    }

    public plugin(): boolean
    {
        window.addEventListener('touchstart', (e: TouchEvent) =>
        {
            this._isDown = true;
            this._startTouching.x = e.touches[0].pageX;
            this._startTouching.y = e.touches[0].pageY;

            this.onTouch.emit();
        });
        window.addEventListener('touchend', (e: TouchEvent) =>
        {
            this._startTouching.x = this._startTouching.y = 0;
            this._direction.x = this._direction.y = 0;

            this._isDown = false;
        });
        window.addEventListener('touchmove', (e: TouchEvent) =>
        {
            if (e.touches.length > 0)
            {
                this._startTouching.x = this.position.x;
                this._startTouching.y = this.position.y;

                this.position.x = e.touches[0].pageX;
                this.position.y = e.touches[0].pageY;

                this._direction = this.position.sub(this._startTouching).normalize();
            }
        });
        return true;
    }
}