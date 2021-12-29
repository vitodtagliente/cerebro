const deg2rad_factor: number = Math.PI / 180;
const rad2deg_factor: number = 180 / Math.PI;

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
    return Math.max(min, Math.min(value, max));
}

/// @param max inclusive
export function random(min: number, max: number): number
{
    return Math.random() * (max - min) + min;
}