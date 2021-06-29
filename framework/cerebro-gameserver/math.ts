
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
}