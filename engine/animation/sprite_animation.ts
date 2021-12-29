import { TextureRect } from "../graphics";
import { clamp } from "../math/algo";

export default class SpriteAnimation
{
    private _frames: Array<[TextureRect, number]>;
    private _startingFrame: number;

    public constructor()
    {
        this._frames = new Array<[TextureRect, number]>();
        this._startingFrame = 0;
    }

    public get frames(): Array<[TextureRect, number]> { return this._frames; }
    public get length(): number { return this._frames.length; }
    public get startingFrame(): number { return this._startingFrame; }
    public set startingFrame(value: number) { this._startingFrame = clamp(value, 0, this.length); }

    public add(frame: TextureRect, duration: number): void 
    {
        this._frames.push([frame, duration]);
    }
}