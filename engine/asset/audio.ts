import Asset, { AssetType } from "./asset";

export default class Audio extends Asset
{
    public constructor()
    {
        super(AssetType.Audio);
        this._data = new window.Audio();
    }

    public get data(): HTMLAudioElement { return this._data; }
    public get isPlaying(): boolean { return this.data.paused == false; }

    public play(): void 
    {
        if (this.isPlaying == false)
        {
            this._data.play();
        }
    }

    protected _isLoaded(): boolean
    {
        return this.data.networkState == this.data.NETWORK_IDLE;
    }

    protected _load(filename: string): boolean
    {
        this._data.onload = () => { this.onLoad.emit(); };
        this._data.src = filename;
        return true;
    }

    public dispose(): void
    {
        this._data = null;
    }
}