import { Canvas } from "../application";
import { Signal } from "../core";
import { Vector2 } from "../math";
import Device from "./device";
import KeyCode from "./key_code";

enum EventType
{
    MouseDown = 'mousedown',
    MouseEnter = 'mouseenter',
    MouseMove = 'mousemove',
    MouseOut = 'mouseout',
    MouseUp = 'mouseup'
}

export default class Mouse extends Device
{
    private _keys: Set<KeyCode>;
    private _position: Vector2;
    private _isOutOfCanvas: boolean;

    public onClick: Signal<void>;

    public constructor(canvas: Canvas)
    {
        super(canvas);
        this._keys = new Set<KeyCode>();
        this._position = Vector2.zero.clone();
        this._isOutOfCanvas = false;

        this.onClick = new Signal<void>();
    }

    public get position(): Vector2 { return this._position; }

    public isButtonPressed(keyCode: KeyCode): boolean
    {
        if (this._keys.has(keyCode))
        {
            this._keys.delete(keyCode);
            return true;
        }
        return false;
    }

    public isButtonDown(keyCode: KeyCode): boolean
    {
        return this._keys.has(keyCode);
    }

    public release(keyCode: KeyCode): void 
    {
        this._keys.delete(keyCode);
    }

    public plugin(): boolean
    {
        this.canvas.canvas.addEventListener(EventType.MouseDown, (e: MouseEvent) =>
        {
            const keyCode: KeyCode = `MouseButton${e.button.toString()}` as KeyCode;
            this._keys.add(keyCode);

            if (keyCode == KeyCode.MouseButton0)
            {
                this.onClick.emit();
            }

            e.stopPropagation();
            e.preventDefault();
        });
        this.canvas.canvas.addEventListener(EventType.MouseUp, (e: MouseEvent) =>
        {
            const keyCode: KeyCode = `MouseButton${e.button.toString()}` as KeyCode;
            this._keys.delete(keyCode);

            e.stopPropagation();
            e.preventDefault();
        });
        this.canvas.canvas.addEventListener(EventType.MouseOut, (e: MouseEvent) =>
        {
            this._isOutOfCanvas = true;
        });
        this.canvas.canvas.addEventListener(EventType.MouseEnter, (e: MouseEvent) =>
        {
            this._isOutOfCanvas = false;
        });
        this.canvas.canvas.addEventListener(EventType.MouseMove, (e: MouseEvent) =>
        {
            if (!this._isOutOfCanvas)
            {
                this.position.x = e.offsetX;
                this.position.y = e.offsetY;
            }
        });
        return true;
    }
}