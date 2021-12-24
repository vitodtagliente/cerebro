import GameObject from "./game_object";
import Input from "./input";
import Renderer from "./renderer";

export default class World
{
    private _objects: Array<GameObject>;

    public constructor()
    {
        this._objects = new Array<GameObject>();
    }

    public get objects(): Array<GameObject> { return this._objects; }

    public spawn(object: GameObject): GameObject
    {
        this._objects.push(object);
        object.spawn(this);
        object.init();
        return object;
    }

    public destroy(object: GameObject): void 
    {
        const index: number = this._objects.findIndex(obj => obj == object);
        if (index >= 0)
        {
            object.prepareToDestroy();
            this._objects.splice(index, 1);
        }
    }

    public update(input: Input, deltaTime: number): void 
    {
        for (const object of this._objects)
        {
            object.update(input, deltaTime);
        }
    }

    public render(renderer: Renderer): void 
    {
        for (const object of this._objects)
        {
            object.render(renderer);
        }
    }
}