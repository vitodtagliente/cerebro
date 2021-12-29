import Matrix4 from "./matrix4";
import Vector3 from "./vector3";
import Vector4 from "./vector4";

export default class Quaternion
{
    public static identity(): Quaternion { return new Quaternion(0, 0, 0, 1); }

    public data: number[] = [4];

    public get x(): number { return this.data[0]; }
    public set x(value: number) { this.data[0] = value; }
    public get y(): number { return this.data[1]; }
    public set y(value: number) { this.data[1] = value; }
    public get z(): number { return this.data[2]; }
    public set z(value: number) { this.data[2] = value; }
    public get w(): number { return this.data[3]; }
    public set w(value: number) { this.data[3] = value; }

    public constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 1)
    {
        this.data = [x, y, z, w];
    }

    public dot(quaternion: Quaternion): number
    {
        return this.w * quaternion.w + this.x * quaternion.x + this.y * quaternion.y + this.z * quaternion.z;
    }

    public cross(quaternion: Quaternion): Quaternion
    {
        return new Quaternion(
            this.w * quaternion.x + this.x * quaternion.w + this.y * quaternion.z - this.z * quaternion.y,
            this.w * quaternion.y + this.y * quaternion.w + this.z * quaternion.x - this.x * quaternion.z,
            this.w * quaternion.z + this.z * quaternion.w + this.x * quaternion.y - this.y * quaternion.x,
            this.w * quaternion.w - this.x * quaternion.x + this.y * quaternion.y - this.z * quaternion.z
        );
    }

    public matrix(): Matrix4
    {
        const xy: number = this.x * this.y;
        const xz: number = this.x * this.z;
        const yz: number = this.y * this.z;
        const x2: number = this.x * this.x;
        const y2: number = this.y * this.y;
        const z2: number = this.z * this.z;

        return new Matrix4(
            1 - 2 * y2 - 2 * z2, 2 * xy + 2 * this.w * this.z, 2 * xz - 2 * this.w * this.y, 0.,
            2 * xy - 2 * this.w * this.z, 1 - 2 * x2 - 2 * z2, 2 * yz + 2 * this.w * this.z, 0,
            2 * xz + 2 * this.w * this.y, 2 * yz - 2 * this.w * this.x, 1 - 2 * x2 - 2 * y2, 0,
            0, 0, 0, 1
        );
    }

    public normalize(): Quaternion
    {
        return this.div(this.magnitude);
    }

    public get magnitude(): number 
    {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }

    public add(q: Quaternion): Quaternion
    {
        return new Quaternion(this.x + q.x, this.y + q.y, this.z + q.z, this.w + q.w);
    }

    public sub(q: Quaternion): Quaternion
    {
        return new Quaternion(this.x - q.x, this.y - q.y, this.z - q.z, this.w - q.w);
    }

    public mul(scalar: number): Quaternion
    {
        return new Quaternion(this.x * scalar, this.y * scalar, this.z * scalar, this.w * scalar);
    }

    public mulVector3(v: Vector3): Vector3
    {
        const qvec: Vector3 = new Vector3(this.x, this.y, this.z);
        const uv: Vector3 = qvec.cross(v);
        const uuv: Vector3 = qvec.cross(uv);

        return v.add(uv.mul(2 * this.w)).add(uuv.mul(2));
    }

    public mulVector4(v: Vector4): Vector4
    {
        const vec: Vector3 = new Vector3(v.x, v.y, v.z);
        const qvec: Vector3 = new Vector3(this.x, this.y, this.z);
        const uv: Vector3 = qvec.cross(vec);
        const uuv: Vector3 = qvec.cross(uv);
        const sum: Vector3 = vec.add(uv.mul(2 * this.w)).add(uuv.mul(2));

        return new Vector4(sum.x, sum.y, sum.z, 1);
    }

    public div(scalar: number): Quaternion
    {
        const factor: number = 1 / scalar;
        return new Quaternion(this.x * factor, this.y * factor, this.z * factor, this.w * factor);
    }

    public inverse(): Quaternion
    {
        const f: number = 1 / Math.pow(this.magnitude, 2);
        return new Quaternion(-this.x * f, -this.y * f, -this.z * f, this.w * f);
    }
}