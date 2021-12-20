type TickEvent = () => void;

export default class Time
{
    private _lastTick: number;
    private _time: number;
    private _deltaTime: number;

    public onTick: TickEvent = () => { };

    public constructor()
    {
        this._lastTick = new Date().getTime();
    }

    public get time(): number { return this._time; }
    public get deltaTime(): number { return this._deltaTime; }

    public tick(): void
    {
        const currentTick: number = new Date().getTime();
        this._deltaTime = currentTick - this._lastTick;
        this._lastTick = currentTick;
        this._time += this._deltaTime;

        this.onTick();
    }
}