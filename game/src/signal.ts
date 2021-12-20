type Handler<T> = (data: T) => void;

export default class Signal<T>
{
    private _handlers: Array<Handler<T>>;

    public constructor()
    {
        this._handlers = new Array<Handler<T>>();
    }

    public on(handler: Handler<T>): void 
    {
        this._handlers.push(handler);
    }

    public off(handler: Handler<T>): void 
    {
        this._handlers = this._handlers.filter(h => h != handler);
    }

    public emit(data: T): void 
    {
        for (const h of this._handlers)
        {
            h(data);
        }
    }
}