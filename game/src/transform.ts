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
}