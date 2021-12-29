import * as StatsJs from 'stats.js'

export default class Stats
{
    private _fpsStats: StatsJs;
    private _memoryStats: StatsJs;

    public constructor()
    {
        this._fpsStats = new StatsJs();
        document.body.appendChild(this._fpsStats.dom);
        this._fpsStats.begin();

        this._memoryStats = new StatsJs();
        this._memoryStats.showPanel(2);
        this._memoryStats.dom.style.cssText = 'position:absolute;top:0px;left:80px;';
        document.body.appendChild(this._memoryStats.dom);
        this._memoryStats.begin();
    }

    public update(): void 
    {
        this._fpsStats.update();
        this._memoryStats.update();
    }
}