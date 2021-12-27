import Color from "./color";

export default class Camera
{
    public backgroundColor: Color;

    public constructor()
    {
        this.backgroundColor = Color.white();
    }
}