export default class Rect
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
}