import Vector2 from "./vector2";

export default class Transform
{
    public position: Vector2;
    public rotation: Vector2;
    public scale: Vector2;

    public constructor()
    {
        this.position = new Vector2(0, 0);
        this.rotation = new Vector2(0, 0);
        this.scale = new Vector2(1, 1);
    }

    public clone(): Transform
    {
        const transform: Transform = new Transform;
        transform.position = this.position.clone();
        transform.rotation = this.rotation.clone();
        transform.scale = this.scale.clone();
        return transform;
    }

    public copy(transform: Transform): void
    {
        this.position.copy(transform.position);
        this.rotation.copy(transform.rotation);
        this.scale.copy(transform.scale);
    }
}