export namespace NetworkMath
{
    const deg2rad_factor: number = global.Math.PI / 180;
    const rad2deg_factor: number = 180 / global.Math.PI;

    export function radians(angle: number): number
    {
        return angle * deg2rad_factor;
    }

    export function degrees(radians: number): number
    {
        return radians * rad2deg_factor;
    }

    export function lerp(a: number, b: number, time: number): number
    {
        return (1 - time) * a + b * time;
    }

    export function clamp(value: number, min: number, max: number): number
    {
        return global.Math.max(min, global.Math.min(value, max));
    }

    /// @param max inclusive
    export function random(min: number, max: number): number
    {
        return global.Math.random() * (max - min) + min;
    }

    export class Vector3
    {
        public x: number = 0.0;
        public y: number = 0.0;
        public z: number = 0.0;

        public constructor(_x?: number, _y?: number, _z?: number)
        {
            this.x = _x ? _x : 0;
            this.y = _y ? _y : 0;
            this.z = _z ? _z : 0;
        }

        public sum(v: Vector3): Vector3
        {
            return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
        }

        public selfSum(v: Vector3): Vector3
        {
            this.x += v.x;
            this.y += v.y;
            this.z += v.z;
            return this;
        }

        public sub(v: Vector3): Vector3
        {
            return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
        }

        public selfSub(v: Vector3): Vector3
        {
            this.x -= v.x;
            this.y -= v.y;
            this.z -= v.z;
            return this;
        }

        public clone(): Vector3
        {
            return new Vector3(this.x, this.y, this.z);
        }

        public copy(v: Vector3): void
        {
            this.x = v.x;
            this.y = v.y;
            this.z = v.z;
        }
    }

    export class Transform
    {
        public constructor()
        {
            this.position = new Vector3;
            this.rotation = new Vector3;
            this.scale = new Vector3(1, 1, 1);
        }

        public position: Vector3;
        public rotation: Vector3;
        public scale: Vector3;

        public clone(): Transform
        {
            const t: Transform = new Transform;
            t.position.copy(this.position);
            t.rotation.copy(this.rotation);
            t.scale.copy(this.scale);
            return t;
        }

        public copy(transform: Transform): void
        {
            this.position.copy(transform.position);
            this.rotation.copy(transform.rotation);
            this.scale.copy(transform.scale);
        }
    }
}