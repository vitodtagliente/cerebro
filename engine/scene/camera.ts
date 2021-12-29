import { Color } from "../graphics";
import { Matrix4 } from "../math";
import Entity from "./entity";

export enum CameraMode
{
    Ortographic,
    Perspective
}

export default abstract class Camera
{
    protected _mode: CameraMode;
    protected _view: Matrix4;
    private _matrix: Matrix4;
    public background: Color;

    public constructor()
    {
        this._mode = CameraMode.Ortographic;
        this.background = Color.white.clone();
        this._matrix = Matrix4.identity.clone();
        this._view = Matrix4.identity.clone();
    }

    public get mode(): CameraMode { return this._mode; }
    public get view(): Matrix4 { return this._view; }
    public get matrix(): Matrix4 { return this._matrix; }

    public compute(): void
    {
        // Matrix4.multiplyMatrices([this._view, this.transform.matrix]).copy(this._matrix);
    }

    public abstract computeViewMatrix(): void;
}