export default class Vector3
{
    public static readonly zero: Vector3 = new Vector3(0, 0, 0);
    public static readonly one: Vector3 = new Vector3(1, 1, 1)

    public static readonly up: Vector3 = new Vector3(0, 1, 0);
    public static readonly right: Vector3 = new Vector3(1, 0, 0);
    public static readonly left: Vector3 = new Vector3(-1, 0, 0);
    public static readonly down: Vector3 = new Vector3(0, -1, 0);
    public static readonly forward: Vector3 = new Vector3(0, 0, -1);

    public data: Float32Array;

    public get x(): number { return this.data[0]; }
    public set x(value: number) { this.data[0] = value; }
    public get y(): number { return this.data[1]; }
    public set y(value: number) { this.data[1] = value; }
    public get z(): number { return this.data[2]; }
    public set z(value: number) { this.data[2] = value; }

    public constructor(x: number = 0, y: number = 0, z: number = 0)
    {
        this.data = new Float32Array([x, y, z]);
    }

    public set(x: number, y: number, z: number): void
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public clone(): Vector3 
    {
        return new Vector3(this.x, this.y, this.z);
    }

    public copy(v: Vector3): void
    {
        v.data = this.data.slice();
    }

    public equals(v: Vector3): boolean
    {
        return this.x == v.x && this.y == v.y && this.z == v.z;
    }

    public add(v: Vector3): Vector3
    {
        return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
    }

    public sub(v: Vector3): Vector3
    {
        return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
    }

    public mul(scalar: number): Vector3
    {
        return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
    }

    public div(scalar: number): Vector3
    {
        const factor: number = 1 / scalar;
        return new Vector3(this.x * factor, this.y * factor, this.z * factor);
    }

    public dot(v: Vector3): number
    {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    public cross(v: Vector3): Vector3
    {
        return new Vector3(
            this.y * v.z - this.z * v.y,
            this.z * v.x - this.x * v.z,
            this.x * v.y - this.y * v.x
        );
    }

    public normalize(): Vector3
    {
        const mag: number = this.magnitude;
        if (mag > 0)
        {
            return this.div(this.magnitude);
        }
        else return new Vector3(this.x, this.y, this.z);
    }

    public static distance(a: Vector3, b: Vector3): number
    {
        return a.sub(b).magnitude;
    }

    public get magnitude(): number { return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z); }
}