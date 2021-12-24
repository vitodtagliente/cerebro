import Canvas from './canvas';
import Color from './color';
import Context from './context';
import Input from './input';
import Keycode from './keycode';
import Renderer from './renderer';
import Time from './time';
import Vector2 from './vector2';

import { Client, NetworkProtocol } from 'cerebro-netcore';
import { GameClient, Level, Math } from 'cerebro-netgame';
import World from './world';
import input from './input';

export class EngineSettings
{
    public host: string = 'localhost';
    public port: number = 8080;
}

export default class Engine
{
    private _settings: EngineSettings;
    private _canvas: Canvas;
    private _context: Context;
    private _input: input;
    private _renderer: Renderer;
    private _time: Time;
    private _world: World;

    private _client: Client;
    private _game: GameClient;

    public constructor(canvasId: string, settings: EngineSettings = new EngineSettings)
    {
        this._settings = settings;
        this._canvas = new Canvas(canvasId);
        this._context = new Context(this._canvas);
        this._input = new input(this._canvas);
        this._renderer = new Renderer(this._context);
        this._time = new Time();
        this._world = new World();

        this._canvas.onResize.on(() =>
        {

        });
    }

    public get settings(): EngineSettings { return this._settings; }
    public get canvas(): Canvas { return this._canvas; }
    public get input(): Input { return this._input; }
    public get renderer(): Renderer { return this._renderer; }
    public get time(): Time { return this._time; }
    public get world(): World { return this._world; }

    public run(): void
    {
        this._client = new Client(NetworkProtocol.W3CWebSocket);
        this._game = new GameClient(this._client);
        this._client.components.add(this._game);
        this._client.onConnection = async () =>
        {
            this.loop();
        };
        this._client.connect(this._settings.host, this._settings.port);
    }

    private loop(): void 
    {
        this._time.tick();
        const deltaTime: number = this._time.deltaTime;

        this._context.clear(Color.white());

        const mainLevel: string = "MAIN_LEVEL";
        const level: Level = this._game.world.get(mainLevel);
        if (level)
        {
            for (const [id, obj] of level.objects)
            {
                let position: Vector2 = new Vector2(obj.transform.position.x, obj.transform.position.y);
                /*
                if (null)
                {
                    const shadowObject: NetworkObject = shadowLevel.get(id);
                    if (shadowObject)
                    {
                        position = position.lerp(
                            new Vector2(shadowObject.transform.position.x, shadowObject.transform.position.y),
                            position,
                            this.time.deltaTime
                        )
                        console.log(`interpolate ${position.x}:${position.y} from ${shadowObject.transform.position.x}:${shadowObject.transform.position.y} to ${obj.transform.position.x}:${obj.transform.position.y}`);
                    }
                }
                */

                this._context.drawCircle(
                    position,
                    16,
                    Color.black()
                );
            }
        }

        {
            const transform: Math.Transform = new Math.Transform;
            const speed: number = .5;
            let dirty: boolean = false;
            if (this.input.keyboard.isKeysDown(Keycode.W))
            {
                transform.position.y -= speed * this.time.deltaTime;
                dirty = true;
            }
            else if (this.input.keyboard.isKeysDown(Keycode.S))
            {
                transform.position.y += speed * this.time.deltaTime;
                dirty = true;
            }

            if (this.input.keyboard.isKeysDown(Keycode.A))
            {
                transform.position.x -= speed * this.time.deltaTime;
                dirty = true;
            }
            else if (this.input.keyboard.isKeysDown(Keycode.D))
            {
                transform.position.x += speed * this.time.deltaTime;
                dirty = true;
            }

            if (this.input.touch.isDown)
            {
                transform.position.selfSum(new Math.Vector3(
                    this.input.touch.direction.x * speed * this.time.deltaTime,
                    this.input.touch.direction.y * speed * this.time.deltaTime,
                    0
                ));
                dirty = true;
            }

            if (dirty)
            {
                this._game.move(transform);
            }
        }

        requestAnimationFrame(() => this.loop());
    }
}