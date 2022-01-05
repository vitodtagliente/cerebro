import { Serializable } from "../core";

export default class Rect extends Serializable
{
    public data: Float32Array;

    public get x(): number { return this.data[0]; }
    public set x(value: number) { this.data[0] = value; }
    public get y(): number { return this.data[1]; }
    public set y(value: number) { this.data[1] = value; }
    public get width(): number { return this.data[2]; }
    public set width(value: number) { this.data[2] = value; }
    public get height(): number { return this.data[3]; }
    public set height(value: number) { this.data[3] = value; }

    public constructor(x: number = 0, y: number = 0, width: number = 1, height: number = 1)
    {
        super();
        this.data = new Float32Array([
            x, y, width, height
        ]);
    }

    public clone(): Rect
    {
        return new Rect(this.x, this.y, this.width, this.width);
    }

    public copy(r: Rect): void 
    {
        r.data = this.data.slice();
    }

    public set(x: number, y: number, width: number, height: number): void 
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public serialize(): any 
    {
        return {
            'x': this.x,
            'y': this.y,
            'width': this.width,
            'height': this.height
        };
    }

    public deserialize(data: any): void 
    {
        for (const key of Object.keys(data))
        {
            switch (key)
            {
                case 'x': this.x = data[key]; break;
                case 'y': this.y = data[key]; break;
                case 'width': this.width = data[key]; break;
                case 'height': this.height = data[key]; break;
            }
        }
    }
}