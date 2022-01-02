import { NetworkComponent } from "cerebro-netgame";
import { ComponentRegister } from ".";
import { clamp } from "../math/algo";
import { Component, ComponentId } from "../scene";

class Health extends Component
{
    private _max: number;
    private _value: number

    public static readonly id: ComponentId = 'health';

    public constructor()
    {
        super();
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
}

ComponentRegister.main.add(Health.id, Health);

export default Health;