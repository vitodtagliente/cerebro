export declare namespace Math {
    class Vector3 {
        x: number;
        y: number;
        z: number;
        constructor(_x?: number, _y?: number, _z?: number);
    }
    class Transform {
        constructor();
        position: Vector3;
        rotation: Vector3;
        scale: Vector3;
    }
}
