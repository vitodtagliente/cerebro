export namespace Math
{
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

        public copyFrom(v: Vector3): void
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

        public copyFrom(transform: Transform): void
        {
            this.position.copyFrom(transform.position);
            this.rotation.copyFrom(transform.rotation);
            this.scale.copyFrom(transform.scale);
        }
    }
}