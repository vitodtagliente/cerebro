export default class Timer
{
    private _timer: number;
    private _time: number;
    private _canTick: boolean;

    public constructor(time: number)
    {
        this._time = time;
        this._timer = time;
        this._canTick = true;
    }

    public get remainingTime(): number { return this._timer; }
    public get isExpired(): boolean { return this._timer <= 0; }
    public get isTicking(): boolean { return this._canTick; }

    public tick(deltaTime: number): void 
    {
        if (this._timer > 0 && this._canTick)
        {
            this._timer -= deltaTime;
        }
    }

    public reset(): void 
    {
        this._timer = this._time;
    }

    public pause(): void
    {
        this._canTick = false;
    }

    public resume(): void
    {
        this._canTick = true;
    }

    public stop(): void 
    {
        this._timer = this._time;
        this._canTick = false;
    }

    public configure(time: number): void 
    {
        this._time = time;
        this._timer = time;
    }
}