export declare namespace Math {
    function radians(angle: number): number;
    function degrees(radians: number): number;
    function lerp(a: number, b: number, time: number): number;
    function clamp(value: number, min: number, max: number): number;
    function random(min: number, max: number): number;
    class Vector3 {
        x: number;
        y: number;
        z: number;
        constructor(_x?: number, _y?: number, _z?: number);
        sum(v: Vector3): Vector3;
        selfSum(v: Vector3): Vector3;
        sub(v: Vector3): Vector3;
        selfSub(v: Vector3): Vector3;
        clone(): Vector3;
        copy(v: Vector3): void;
    }
    class Transform {
        constructor();
        position: Vector3;
        rotation: Vector3;
        scale: Vector3;
        clone(): Transform;
        copy(transform: Transform): void;
    }
}
