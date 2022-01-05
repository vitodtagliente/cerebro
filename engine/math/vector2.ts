import { Serializable } from "../core";

export default class Vector2 extends Serializable
{
    public static readonly zero: Vector2 = new Vector2(0, 0);
    public static readonly one: Vector2 = new Vector2(1, 1);

    public static readonly up: Vector2 = new Vector2(0, 1);
    public static readonly right: Vector2 = new Vector2(1, 0);
    public static readonly left: Vector2 = new Vector2(-1, 0);
    public static readonly down: Vector2 = new Vector2(0, -1);

    public data: Float32Array;

    public get x(): number { return this.data[0]; }
    public set x(value: number) { this.data[0] = value; }
    public get y(): number { return this.data[1]; }
    public set y(value: number) { this.data[1] = value; }

    public constructor(x: number = 0, y: number = 0)
    {
        super();
        this.data = new Float32Array([x, y]);
    }

    public set(x: number, y: number): void
    {
        this.x = x;
        this.y = y;
    }

    public clone(): Vector2
    {
        return new Vector2(this.x, this.y);
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

    public static distance(a: Vector2, b: Vector2): number
    {
        return a.sub(b).magnitude;
    }

    public static lerp(a: Vector2, b: Vector2, t: number): Vector2
    {
        const delta: Vector2 = b.sub(a);
        return new Vector2(
            a.x + delta.x * t,
            a.y + delta.y * t
        );
    }

    public get magnitude(): number { return Math.sqrt(this.x * this.x + this.y * this.y); }

    public toString(): string
    {
        return `{${this.x},${this.y}}`;
    }

    public serialize(): any 
    {
        return {
            'x': this.x,
            'y': this.y
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
            }
        }
    }
}