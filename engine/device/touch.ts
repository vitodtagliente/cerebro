import { Canvas } from "../application";
import { Signal } from "../core";
import { Vector2 } from "../math";
import Device from "./device";

enum EventType
{
    TouchEnd = 'touchend',
    TouchMove = 'touchmove',
    TouchStart = 'touchstart'
}

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
        this._position = Vector2.zero.clone();
        this._startTouching = Vector2.zero.clone();
        this._direction = Vector2.zero.clone();

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
        window.addEventListener(EventType.TouchStart, (e: TouchEvent) =>
        {
            this._isDown = true;
            this._startTouching.x = e.touches[0].pageX;
            this._startTouching.y = e.touches[0].pageY;

            this.onTouch.emit();
        });
        window.addEventListener(EventType.TouchEnd, (e: TouchEvent) =>
        {
            this._startTouching.x = this._startTouching.y = 0;
            this._direction.x = this._direction.y = 0;

            this._isDown = false;
        });
        window.addEventListener(EventType.TouchMove, (e: TouchEvent) =>
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