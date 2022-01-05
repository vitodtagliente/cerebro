import { Serializable } from "../core";
import { TextureRect } from "../graphics";
import { clamp } from "../math/algo";

export default class SpriteAnimation extends Serializable
{
    private _frames: Array<[TextureRect, number]>;
    private _startingFrame: number;

    public constructor()
    {
        super();
        this._frames = new Array<[TextureRect, number]>();
        this._startingFrame = 0;
    }

    public get frames(): Array<[TextureRect, number]> { return this._frames; }
    public get length(): number { return this._frames.length; }
    public get startingFrame(): number { return this._startingFrame; }
    public set startingFrame(value: number) { this._startingFrame = clamp(value, 0, this.length); }

    public add(frame: TextureRect, duration: number = 1): void 
    {
        this._frames.push([frame, duration]);
    }

    public clear(): void 
    {
        this._frames.slice(0, this._frames.length);
    }

    public serialize(): any 
    {
        const frames: Array<any> = [];
        for (const [rect, duration] of this._frames)
        {
            frames.push({
                'duration': duration,
                'textureRect': rect.serialize()
            });
        }

        return {
            'frames': frames,
            'startingFrame': this._startingFrame
        };
    }

    public deserialize(data: any): void 
    {
        this.clear();

        for (const key of Object.keys(data))
        {
            switch (key)
            {
                case 'frames':
                    {
                        for (const it of data[key] as Array<any>)
                        {
                            const rect: TextureRect = new TextureRect;
                            rect.deserialize(it['textureRect']);
                            this.add(rect, it['duration']);
                        }
                        break;
                    }
                case 'startingFrame': this._startingFrame = data[key]; break;
            }
        }
    }
}