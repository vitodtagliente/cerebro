import Component, { ComponentId } from "./component";
export default class ComponentRegister<T extends Component> {
    private _components;
    constructor();
    get components(): Map<ComponentId, T>;
    add(component: T): void;
    delete(ComponentId: ComponentId): void;
    find(ComponentId: ComponentId): T;
    has(ComponentId: ComponentId): boolean;
}
