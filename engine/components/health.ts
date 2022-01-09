import { NetworkComponent } from "cerebro-netgame";
import { ComponentRegister } from ".";
import { Color, Renderer } from "../graphics";
import { Vector2 } from "../math";
import { clamp } from "../math/algo";
import { Component, ComponentId } from "../scene";

class Health extends Component
{
    private _max: number;
    private _value: number

    public position: Vector2;
    public size: Vector2;

    public static readonly id: ComponentId = 'health';

    public constructor()
    {
        super();
        this.position = new Vector2(0, -20);
        this.size = new Vector2(50, 10);
    }

    public get isAlive(): boolean { return this._value > 0; }
    public get max(): number { return this._max; }
    public get value(): number { return this._value; }

    public set max(value: number)
    {
        this._max = value;
        this._value = clamp(this._value, 0, this._max);
    }

    public set value(value: number)
    {
        this._value = clamp(value, 0, this._max);
    }

    public netUpdate(component: NetworkComponent): void
    {
        this._max = component.data.asNumber('max');
        this.value = component.data.asNumber('value');
    }

    public render(renderer: Renderer): void 
    {
        // width:max=x:value -> x = width*value/max
        const x: number = this.size.x * this.value / this.max;
        renderer.context.drawRect(
            this.owner.transform.position.add(this.position).sub(new Vector2((this.size.x - x) / 2, 0)),
            x,
            this.size.y,
            Color.red
        );
        renderer.context.strokeRect(this.owner.transform.position.add(this.position), this.size.x, this.size.y, Color.black);
    }

    public serialize(): any 
    {
        return {
            'type': Health.id,
            'position': this.position.serialize(),
            'size': this.size.serialize(),
            'max': this.max,
            'value': this.value
        };
    }

    public deserialize(data: any): void 
    {
        for (const key of Object.keys(data))
        {
            switch (key)
            {
                case 'position': this.position.deserialize(data[key]); break;
                case 'size': this.size.deserialize(data[key]); break;
                case 'max': this.max = data[key] as number; break;
                case 'value': this.value = data[key] as number; break;
            }
        }
    }
}

ComponentRegister.main.add(Health.id, Health);

export default Health;