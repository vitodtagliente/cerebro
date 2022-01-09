import { Client, Encoding, NetworkProtocol } from "cerebro-netcore";
import { GameClient, NetworkLevel } from "cerebro-netgame";
import { SpriteAnimation, SpriteAnimator } from "../animation";
import { AssetLibrary, Image } from "../asset";
import { AssetType } from "../asset/asset";
import { SpriteRenderer } from "../components";
import { Time } from "../core";
import { Input } from "../device";
import { Color, Context, Renderer, TextureRect } from "../graphics";
import { Player, PlayerController } from "../player";
import { Entity, World } from "../scene";
import Canvas from "./canvas";
import Game from './game';
import Stats from "./stats";

export class EngineSettings
{
    public host: string = 'localhost';
    public port: number = 8080;
    public playerControllerType: { new(...args: any[]): PlayerController } = PlayerController;
    public startingScene: string = '';
}

export default class Engine
{
    private _canvas: Canvas;
    private _context: Context;
    private _game: Game;
    private _input: Input;
    private _players: Map<number, Player>;
    private _renderer: Renderer;
    private _settings: EngineSettings;
    private _time: Time;
    private _world: World;

    private _client: Client;
    private _gameClient: GameClient;

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

        this._world.onEntitySpawn.on((entity: Entity) => 
        {
            if (entity.asset == 'slime')
            {
                entity.transform.scale.set(0.3, 0.3);
                const spriteRenderer = entity.addComponent(new SpriteRenderer);
                spriteRenderer.image = AssetLibrary.main.get(AssetType.Image, 'assets/slime.png') as Image;

                const animator = entity.findComponent(SpriteAnimator);
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

            if (entity.asset == 'player')
            {
                this._players.get(0).controller.possess(entity);
                entity.transform.scale.set(1.5, 1.5);
                const spriteRenderer = entity.addComponent(new SpriteRenderer);
                spriteRenderer.image = AssetLibrary.main.get(AssetType.Image, 'assets/chars.png') as Image;

                const animator = entity.findComponent(SpriteAnimator);
                {
                    {
                        const animation = new SpriteAnimation;
                        animation.add(new TextureRect(4 * 1 / 12, 0, 1 / 12, 1 / 8), 10);
                        animator.add('idle', animation);
                    }
                    {
                        const animation = new SpriteAnimation;
                        for (let i = 3; i < 6; ++i)
                        {
                            animation.add(new TextureRect(i * (1 / 12), 0, 1 / 12, 1 / 8), .2);
                        }
                        animator.add('down', animation);
                    }
                    {
                        const animation = new SpriteAnimation;
                        for (let i = 3; i < 6; ++i)
                        {
                            animation.add(new TextureRect(i * (1 / 12), 2 * 1 / 8, 1 / 12, 1 / 8), .2);
                        }
                        animator.add('right', animation);
                    }
                    {
                        const animation = new SpriteAnimation;
                        for (let i = 3; i < 6; ++i)
                        {
                            animation.add(new TextureRect(i * (1 / 12), 1 * 1 / 8, 1 / 12, 1 / 8), .2);
                        }
                        animator.add('left', animation);
                    }
                    {
                        const animation = new SpriteAnimation;
                        for (let i = 3; i < 6; ++i)
                        {
                            animation.add(new TextureRect(i * (1 / 12), 3 * 1 / 8, 1 / 12, 1 / 8), .2);
                        }
                        animator.add('up', animation);
                    }
                    animator.play('idle');
                }

                console.log(Encoding.stringify(entity.serialize()));
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
    public get game(): Game { return this._game; }
    public get input(): Input { return this._input; }
    public get players(): Map<number, Player> { return this._players; }
    public get renderer(): Renderer { return this._renderer; }
    public get settings(): EngineSettings { return this._settings; }
    public get time(): Time { return this._time; }
    public get world(): World { return this._world; }

    public run(game: Game = new Game): void
    {
        this._game = game;

        this._client = new Client(NetworkProtocol.W3CWebSocket);
        this._gameClient = new GameClient(this._client);
        this._client.components.add(this._gameClient);
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
            player.controller.netSerialize(this._gameClient);
        }
    }

    private netUpdate(): void 
    {
        const mainLevel: string = "MAIN_LEVEL";
        const level: NetworkLevel = this._gameClient.world.get(mainLevel);
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