import { Client, NetworkProtocol } from "cerebro-netcore";
import { GameClient, NetworkLevel, Math as NetworkMath } from "cerebro-netgame";
import { Image } from "../asset";
import { Time } from "../core";
import { Input, KeyCode } from "../device";
import { Color, Context, Renderer, Texture, TextureRect } from "../graphics";
import { Vector2 } from "../math";
import { World } from "../scene";
import Canvas from "./canvas";

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
    private _input: Input;
    private _renderer: Renderer;
    private _time: Time;
    private _world: World;

    private _client: Client;
    private _game: GameClient;

    private _debug: boolean;
    private _texture: Texture;

    public constructor(canvasId: string, settings: EngineSettings = new EngineSettings)
    {
        this._settings = settings;
        this._canvas = new Canvas(canvasId);
        this._context = new Context(this._canvas);
        this._input = new Input(this._canvas);
        this._renderer = new Renderer(this._context);
        this._time = new Time();
        this._world = new World();

        this._debug = true;

        this._canvas.onResize.on(() =>
        {

        });

        const img: Image = new Image;
        img.load('assets/slime.png', () => this._texture = new Texture(img));
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

        this.netUpdate();
        this.update(this._time.deltaTime);
        this.render();

        {
            const transform = new NetworkMath.Transform;
            const speed: number = 200;
            let dirty: boolean = false;
            if (this.input.keyboard.isKeysDown(KeyCode.W))
            {
                transform.position.y -= speed * this.time.deltaTime;
                dirty = true;
            }
            else if (this.input.keyboard.isKeysDown(KeyCode.S))
            {
                transform.position.y += speed * this.time.deltaTime;
                dirty = true;
            }

            if (this.input.keyboard.isKeysDown(KeyCode.A))
            {
                transform.position.x -= speed * this.time.deltaTime;
                dirty = true;
            }
            else if (this.input.keyboard.isKeysDown(KeyCode.D))
            {
                transform.position.x += speed * this.time.deltaTime;
                dirty = true;
            }

            if (dirty)
            {
                this._game.move(transform);
            }
        }

        requestAnimationFrame(() => this.loop());
    }

    private netUpdate(): void 
    {
        const mainLevel: string = "MAIN_LEVEL";
        const level: NetworkLevel = this._game.world.get(mainLevel);
        if (level)
        {
            this._world.netUpdate(level);
        }

    }

    private update(deltaTime: number): void
    {
        for (const object of this._world.objects)
        {
            object.update(this._input, deltaTime);
        }
    }

    private render(): void
    {
        this._context.clear(Color.white);

        this._renderer.begin();
        for (const object of this._world.objects)
        {
            object.render(this._renderer);
            if (this._debug)
            {
                if( object.tag == 'slime')
                {
                    this._context.drawSubTexture(
                        object.transform.position,
                        this._texture,
                        new TextureRect(0, 0, .16, 1),
                        new Vector2(.3, .3)
                    );
                }
                else 
                {
                    this._context.drawCircle(
                        object.transform.position,
                        16,
                        Color.black
                    );
                }                
            }
        }
        this._renderer.commit();
    }
}