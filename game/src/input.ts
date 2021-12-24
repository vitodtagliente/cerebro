import Canvas from "./canvas";
import Keyboard from "./keyboard";
import Mouse from "./mouse";
import Touch from "./touch";

export default class Input
{
    private _keyboard: Keyboard;
    private _mouse: Mouse;
    private _touch: Touch;

    public constructor(canvas: Canvas)
    {
        this._keyboard = new Keyboard(canvas);
        this._keyboard.plugin();
        this._mouse = new Mouse(canvas);
        this._mouse.plugin();
        this._touch = new Touch(canvas);
        this._touch.plugin();
    }

    public get keyboard(): Keyboard { return this._keyboard; }
    public get mouse(): Mouse { return this._mouse; }
    public get touch(): Touch { return this._touch; }
}