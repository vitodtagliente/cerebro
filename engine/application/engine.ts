import { Client, NetworkProtocol } from "cerebro-netcore";
import { GameClient, NetworkLevel, NetworkMath } from "cerebro-netgame";
import { SpriteAnimation, SpriteAnimator } from "../animation";
import { AssetLibrary, Image } from "../asset";
import { AssetType } from "../asset/asset";
import { SpriteRenderer } from "../components";
import { Time } from "../core";
import { Input, KeyCode } from "../device";
import { Color, Context, Renderer, Texture, TextureRect } from "../graphics";
import { Player, PlayerController } from "../player";
import { Entity, World } from "../scene";
import Canvas from "./canvas";
import Stats from "./stats";

export class EngineSettings
{
    public host: string = 'localhost';
    public port: number = 8080;
    public playerControllerType: { new(...args: any[]): PlayerController } = PlayerController;
}

export default class Engine
{
    private _canvas: Canvas;
    private _context: Context;
    private _input: Input;
    private _players: Map<number, Player>;
    private _renderer: Renderer;
    private _settings: EngineSettings;
    private _time: Time;
    private _world: World;

    private _client: Client;
    private _game: GameClient;

    private _stats: Stats;

    private _debug: boolean;

    public constructor(canvasId: string, settings: EngineSettings = new EngineSettings)
    {
        this._canvas = new Canvas(canvasId);
        this._context = new Context(this._canvas);
        this._input = new Input(this._canvas);
        this._players = new Map<number, Player>();
        this._renderer = new Renderer(this._context);
        this._settings = settings;
        this._time = new Time();
        this._world = new World();

        // initialize the local player
        // there's always a player at index 0
        {
            const localPlayer: Player = new Player('local');
            this._players.set(0, localPlayer);
            localPlayer.use(new settings.playerControllerType);
        }

        const images: Array<string> = [
            'assets/slime.png',
            'assets/warrior.png'
        ];

        for (const assetname of images)
        {
            const img: Image = new Image;
            img.load(assetname);
        }

        this._world.onEntitySpawn.on((entity: Entity) => 
        {
            if (entity.tag == 'slime')
            {
                entity.transform.scale.set(0.3, 0.3);
                const spriteRenderer = entity.addComponent(new SpriteRenderer);
                spriteRenderer.image = AssetLibrary.main.get(AssetType.Image, 'assets/slime.png') as Image;

                const animator = entity.addComponent(new SpriteAnimator);
                {
                    const animation = new SpriteAnimation;
                    for (let i = 0; i < 6; ++i)
                    {
                        animation.add(new TextureRect(i * .166, 0, .166, 1), .2);
                    }
                    animator.add('idle', animation);
                }
                animator.play('idle');
            }

            if (entity.tag == 'player')
            {
                entity.transform.scale.set(1.5, 1.5);
                const spriteRenderer = entity.addComponent(new SpriteRenderer);
                spriteRenderer.image = AssetLibrary.main.get(AssetType.Image, 'assets/warrior.png') as Image;

                const animator = entity.addComponent(new SpriteAnimator);
                {
                    const animation = new SpriteAnimation;
                    for (let i = 0; i < 6; ++i)
                    {
                        animation.add(new TextureRect(i * (1 / 6), 0, 1 / 6, 1 / 17), .2);
                    }
                    animator.add('idle', animation);
                }
                animator.play('idle');
            }
        });

        this._debug = true;

        if (this._debug)
        {
            this._stats = new Stats();
        }

        this._canvas.onResize.on(() =>
        {

        });
    }

    public get canvas(): Canvas { return this._canvas; }
    public get input(): Input { return this._input; }
    public get players(): Map<number, Player> { return this._players; }
    public get renderer(): Renderer { return this._renderer; }
    public get settings(): EngineSettings { return this._settings; }
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
        this.netSerialize();
        this.render();

        requestAnimationFrame(() => this.loop());
    }

    private netSerialize(): void 
    {
        for (const [index, player] of this._players)
        {
            player.controller.netSerialize(this._game);
        }
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
        for (const [index, player] of this._players)
        {
            player.controller.update(this._input, deltaTime);
        }

        for (const object of this._world.entities)
        {
            object.update(deltaTime);
        }

        if (this._debug)
        {
            this._stats.update();
        }
    }

    private render(): void
    {
        this._context.clear(Color.white);

        this._renderer.begin();
        for (const entity of this._world.entities)
        {
            entity.render(this._renderer);
        }
        this._renderer.commit();
    }
}