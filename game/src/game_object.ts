import { InvalidNetworkId, NetworkId } from "cerebro-netcore";
import { NetworkObject, NetworkObjectProperty } from "cerebro-netgame";
import Component from "./component";
import Input from "./input";
import Renderer from "./renderer";
import Transform from "./transform";
import Vector2 from "./vector2";
import World from "./world";

export default class GameObject 
{
    private _components: Array<Component>;
    private _netId: NetworkId
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

    public addComponent(component: Component): Component
    {
        this._components.push(component);
        component.attach(this);
        return component;
    }

    public removeComponent(component: Component): void 
    {
        const index: number = this._components.findIndex(c => c == component);
        if (index >= 0)
        {
            component.uninit();
            component.detach();
            this._components.splice(index, 1);
        }
    }

    public init(): void 
    {
        for (const component of this._components)
        {
            component.init();
        }
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
            this.removeComponent(component);
        }
    }
}