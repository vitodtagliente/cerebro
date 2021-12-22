import Level, { LevelId } from "./level";
export default class World {
    private _levels;
    constructor();
    get levels(): Map<LevelId, Level>;
    get(levelId: LevelId): Level;
    getOrCreate(levelId: LevelId): Level;
    copyFrom(world: World): void;
}
