import { Canvas } from "../application";
import { Signal } from "../core";
import Device from "./device";
import KeyCode from "./key_code";

enum EventType
{
    KeyDown = 'keydown',
    KeyUp = 'keyup'
}

export default class Keyboard extends Device
{
    private _keys: Set<KeyCode>;

    public onKeyDown: Signal<KeyCode>;
    public onKeyUp: Signal<KeyCode>;

    public constructor(canvas: Canvas)
    {
        super(canvas);
        this._keys = new Set<KeyCode>();

        this.onKeyDown = new Signal<KeyCode>();
        this.onKeyUp = new Signal<KeyCode>();
    }

    public isKeyPressed(keyCode: KeyCode): boolean
    {
        if (this._keys.has(keyCode))
        {
            this._keys.delete(keyCode);
            return true;
        }
        return false;
    }

    public isKeysDown(keyCode: KeyCode): boolean
    {
        return this._keys.has(keyCode);
    }

    public release(keyCode: KeyCode): void 
    {
        this._keys.delete(keyCode);
    }

    public plugin(): boolean
    {
        document.addEventListener(EventType.KeyDown, (e: KeyboardEvent) =>
        {
            const key: KeyCode = e.code as KeyCode;
            this._keys.add(key);

            e.stopPropagation();
            e.preventDefault();

            this.onKeyDown.emit(key);
        });

        document.addEventListener(EventType.KeyUp, (e: KeyboardEvent) =>
        {
            const key: KeyCode = e.code as KeyCode;
            this._keys.delete(key);

            e.stopPropagation();
            e.preventDefault();

            this.onKeyUp.emit(key);
        });

        return true;
    }
}