import { SpriteAnimator } from "blackrose/animation";
import { Engine, EngineSettings } from "blackrose/application";
import { Input, KeyCode } from "blackrose/device";
import { PlayerController } from "blackrose/player";
import { GameClient, NetworkMath } from "cerebro-netgame";

class CustomPlayerController extends PlayerController
{
    private _transform: NetworkMath.Transform;
    private _animation: string = 'idle';
    private _lastAnimation: string;

    public update(input: Input, deltaTime: number): void
    {
        this._lastAnimation = this._animation;
        this._transform = new NetworkMath.Transform;
        const speed: number = 200;
        if (input.keyboard.isKeysDown(KeyCode.W))
        {
            this._transform.position.y -= speed * deltaTime;
        }
        else if (input.keyboard.isKeysDown(KeyCode.S))
        {
            this._transform.position.y += speed * deltaTime;
        }

        if (input.keyboard.isKeysDown(KeyCode.A))
        {
            this._transform.position.x -= speed * deltaTime;
        }
        else if (input.keyboard.isKeysDown(KeyCode.D))
        {
            this._transform.position.x += speed * deltaTime;
        }

        if (this.possessedEntity)
        {
            const animator: SpriteAnimator = this.possessedEntity.findComponent(SpriteAnimator);
            if (animator)
            {
                if (this._transform.position.x != 0)
                {
                    this._animation = this._transform.position.x > 0 ? 'right' : 'left';
                }
                else 
                {
                    if (this._transform.position.y == 0)
                        this._animation = 'idle';
                    else this._animation = this._transform.position.y > 0 ? 'down' : 'up';
                }
            }
        }
    }

    public netSerialize(client: GameClient): void 
    {
        if (this._transform.position.x != 0 || this._transform.position.y != 0 || this._animation != this._lastAnimation)
        {
            client.move(this._transform, this._animation);
        }
    }
}

window.onload = () =>
{
    const settings: EngineSettings = new EngineSettings;
    settings.host = 'localhost';
    settings.playerControllerType = CustomPlayerController;

    const engine: Engine = new Engine('game', settings);
    engine.run();
}