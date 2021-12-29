import Vector2 from "./vector2";
import Vector3 from "./vector3";
import Vector4 from "./vector4";

export function toVector2(v: Vector3 | Vector4): Vector2
{
    return new Vector2(v.x, v.y);
}

export function toVector3(v: Vector2 & Vector4): Vector3
{
    return new Vector3(v.x, v.y, typeof (v) === typeof (Vector2) ? 0 : v.z);
}

export function toVector4(v: Vector2 & Vector3): Vector4
{
    return new Vector4(v.x, v.y, typeof (v) === typeof (Vector3) ? v.z : 0, 0);
}