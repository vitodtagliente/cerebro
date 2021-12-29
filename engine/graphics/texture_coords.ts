import { clamp } from "../math/algo";

export default class TextureCoords
{
    public static zero: TextureCoords = new TextureCoords(0, 0);
    public static one: TextureCoords = new TextureCoords(1, 1);

    public data: Float32Array;

    public get u(): number { return this.data[0]; }
    public set u(value: number)
    {
        this.data[0] = clamp(value, 0, 1);
    }

    public get v(): number { return this.data[1]; }
    public set v(value: number)
    {
        this.data[1] = clamp(value, 0, 1);
    }

    public constructor(u?: number, v?: number)
    {
        this.data = new Float32Array([u, v]);
    }

    public set(u: number, v: number): void 
    {
        this.u = u;
        this.v = v;
    }

    public clone(): TextureCoords
    {
        return new TextureCoords(this.u, this.v);
    }

    public copy(c: TextureCoords): void
    {
        c.data = this.data.slice();
    }
}