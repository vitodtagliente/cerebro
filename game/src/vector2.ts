export default class Vector2
{
    public static zero(): Vector2 { return new Vector2(0, 0); }
    public static one(): Vector2 { return new Vector2(1, 1) }

    public static up(): Vector2 { return new Vector2(0, 1); }
    public static right(): Vector2 { return new Vector2(1, 0); }
    public static left(): Vector2 { return new Vector2(-1, 0); }
    public static down(): Vector2 { return new Vector2(0, -1); }

    public data: Float32Array;

    public get x(): number { return this.data[0]; }
    public set x(value: number) { this.data[0] = value; }
    public get y(): number { return this.data[1]; }
    public set y(value: number) { this.data[1] = value; }

    public constructor(x: number = 0, y: number = 0)
    {
        this.data = new Float32Array([x, y]);
    }

    public set(x: number, y: number): void
    {
        this.x = x;
        this.y = y;
    }

    public copy(v: Vector2): void
    {
        v.data = this.data.slice();
    }

    public equals(v: Vector2): boolean
    {
        return this.x == v.x && this.y == v.y;
    }

    public add(v: Vector2): Vector2
    {
        return new Vector2(this.x + v.x, this.y + v.y);
    }

    public sub(v: Vector2): Vector2
    {
        return new Vector2(this.x - v.x, this.y - v.y);
    }

    public mul(scalar: number): Vector2
    {
        return new Vector2(this.x * scalar, this.y * scalar);
    }

    public div(scalar: number): Vector2
    {
        const factor: number = 1 / scalar;
        return new Vector2(this.x * factor, this.y * factor);
    }

    public dot(v: Vector2): number
    {
        return this.x * v.x + this.y * v.y;
    }

    public rotate(origin: Vector2, angle: number): Vector2
    {
        const diff = this.sub(origin);
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        return new Vector2(
            diff.x * cos - diff.y * sin + origin.x,
            diff.x * sin + diff.y * cos + origin.y
        );
    }

    public normalize(): Vector2
    {
        return this.div(this.magnitude);
    }

    public distance(v: Vector2): number
    {
        return this.sub(v).magnitude;
    }

    public get magnitude(): number { return Math.sqrt(this.x * this.x + this.y * this.y); }
}