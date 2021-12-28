import Asset, { AssetType } from "./asset";

export default class Texture extends Asset
{
    public constructor()
    {
        super(AssetType.Image);
    }
}