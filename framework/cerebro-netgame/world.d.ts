import Level, { LevelId } from "./level";
export default class World {
    private static _main;
    static get main(): World;
    private _levels;
    constructor();
    get levels(): Map<LevelId, Level>;
    get(levelId: LevelId): Level;
}
