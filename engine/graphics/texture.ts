import { Image } from "../asset";

export default class Texture
{
    private _image: Image;

    public constructor(image: Image)
    {
        this._image = image;
    }

    public get image(): Image { return this._image; }
}