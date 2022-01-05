import { Serializable } from "../core";
import Vector2 from "./vector2";

export default class Transform extends Serializable
{
    public position: Vector2;
    public rotation: Vector2;
    public scale: Vector2;

    public constructor()
    {
        super();
        this.position = Vector2.zero.clone();
        this.rotation = Vector2.zero.clone();
        this.scale = Vector2.one.clone();
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

    public serialize(): any 
    {
        return {
            'position': this.position.serialize(),
            'rotation': this.rotation.serialize(),
            'scale': this.scale.serialize()
        };
    }

    public deserialize(data: any): void 
    {
        for (const key of Object.keys(data))
        {
            switch (key)
            {
                case 'position': this.position.deserialize(data[key]); break;
                case 'rotation': this.rotation.deserialize(data[key]); break;
                case 'scale': this.scale.deserialize(data[key]); break;
            }
        }
    }
}