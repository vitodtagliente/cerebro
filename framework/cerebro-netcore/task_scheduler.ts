import Task from "./task";

class TimedSlot
{
    public task: Task;
    public expiresAt: Date;

    public get isExpired(): boolean
    {
        return new Date() > this.expiresAt;
    }
}

export default class TaskScheduler
{
    private _tasks: Array<TimedSlot>;
    private _tickTime: number;
    private _tickEach: number;

    public constructor(tickEach: number = 10000 /* millisec */)
    {
        this._tasks = new Array<TimedSlot>();
        this._tickTime = Date.now();
        this._tickEach = tickEach;
    }

    public add(task: Task): TaskScheduler
    {
        const slot: TimedSlot = new TimedSlot;
        slot.task = task;
        slot.expiresAt = new Date(Date.now() + task.settings.lifetime);
        this._tasks.push(slot);
        return this;
    }

    public remove(task: Task): TaskScheduler
    {
        const index: number = this._tasks.findIndex(slot => slot.task == task);
        if (index >= 0)
        {
            this._tasks.splice(index, 1);
        }
        return this;
    }

    public tick(): void
    {
        if ((Date.now() - this._tickTime) < this._tickEach)
        {
            return;
        }

        this._tickTime = Date.now();

        for (const slot of this._tasks)
        {
            if (slot.isExpired)
            {
                slot.task.execute();
            }
        }
    }
}