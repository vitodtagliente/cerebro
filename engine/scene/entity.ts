import { InvalidNetworkId, NetworkId } from 'cerebro-netcore';
import { NetworkObject, NetworkObjectProperty } from 'cerebro-netgame';
import { Input } from '../device';
import { Renderer } from '../graphics';
import { Transform, Vector2 } from '../math';
import Component from "./component";
import World from './world';

export default class Entity 
{
    private _components: Array<Component>;
    private _netId: NetworkId;
    private _world: World;
    public tag: string;
    public transform: Transform;

    public constructor()
    {
        this._components = new Array<Component>();
        this._netId = InvalidNetworkId;
        this.tag = '';
        this.transform = new Transform;
    }

    public get components(): Array<Component> { return this._components; }
    public get isNetworkObject(): boolean { return this._netId != InvalidNetworkId; }
    public get netId(): NetworkId { return this._netId; }

    public spawn(world: World): void 
    {
        this._world = world;
    }

    public addComponent<T extends Component>(component: T): T
    {
        // assert(component.isAttached == false);
        this._components.push(component);
        component.attach(this);
        component.init();
        return component;
    }

    public findComponent<T extends Component>(constr: { new(...args: any[]): T }): T 
    {
        return this._components.find(component => component instanceof constr) as T;
    }

    public findComponents<T extends Component>(constr: { new(...args: any[]): T }): Array<T> 
    {
        let result: Array<T> = new Array<T>();
        for (const component of this._components)
        {
            if (component instanceof constr)
            {
                result.push(component as T);
            }
        }
        return result;
    }

    public removeComponent<T extends Component>(constr: { new(...args: any[]): T }): void
    {
        let result: Array<Component> = new Array<Component>();
        for (const component of this._components)
        {
            if (component instanceof constr)
            {
                component.uninit();
                component.detach();
            }
            else 
            {
                result.push(component);
            }
        }
        this._components = result;
    }

    public init(): void 
    {
        
    }

    public netInit(networkObject: NetworkObject): void
    {
        this._netId = networkObject.id;
        this.tag = networkObject.state.data.asString(NetworkObjectProperty.AssetType);
        this.netUpdate(networkObject);
    }

    public netUpdate(networkObject: NetworkObject): void 
    {
        if (this._netId != networkObject.id)
            return;

        const startPosition: Vector2 = this.transform.position.clone();
        const desiredPosition: Vector2 = new Vector2(networkObject.transform.position.x, networkObject.transform.position.y);
        this.transform.position = Vector2.lerp(
            startPosition,
            desiredPosition,
            1
        );
    }

    public update(input: Input, deltaTime: number): void 
    {
        for (const component of this._components)
        {
            component.update(this._world, input, deltaTime);
        }
    }

    public render(renderer: Renderer): void
    {
        for (const component of this._components)
        {
            component.render(renderer);
        }
    }

    public prepareToDestroy(): void 
    {
        for (const component of this._components)
        {
            component.uninit();
        }
    }
}