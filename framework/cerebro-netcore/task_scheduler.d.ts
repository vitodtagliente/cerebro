import Task from "./task";
export default class TaskScheduler {
    private _tasks;
    private _tickTime;
    private _tickEach;
    constructor(tickEach?: number);
    add(task: Task): TaskScheduler;
    remove(task: Task): TaskScheduler;
    tick(): void;
}
