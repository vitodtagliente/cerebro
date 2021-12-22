export declare namespace Math {
    class Vector3 {
        x: number;
        y: number;
        z: number;
        constructor(_x?: number, _y?: number, _z?: number);
        sum(v: Vector3): Vector3;
        selfSum(v: Vector3): Vector3;
        sub(v: Vector3): Vector3;
        selfSub(v: Vector3): Vector3;
        copyFrom(v: Vector3): void;
    }
    class Transform {
        constructor();
        position: Vector3;
        rotation: Vector3;
        scale: Vector3;
        copyFrom(transform: Transform): void;
    }
}
