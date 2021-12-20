import Canvas from './canvas';
import Color from './color';
import Context from './context';
import Keyboard from './keyboard';
import Keycode from './keycode';
import Mouse from './mouse';
import Renderer from './renderer';
import Time from './time';
import Vector2 from './vector2';

import { Client, ClientConnection, ClientConnectionState, Encoding, Message, NetworkProtocol, UserSession } from 'cerebro-netcore';
import { GameClient, Level, Math, NetworkObject, World } from 'cerebro-netgame';

export default class Engine
{
    private _canvas: Canvas;
    private _context: Context;
    private _renderer: Renderer;
    private _time: Time;
    private _keyboard: Keyboard;
    private _mouse: Mouse;

    private _client: Client;
    private _game: GameClient;

    public constructor(canvasId: string)
    {
        this._canvas = new Canvas(canvasId);
        this._context = new Context(this._canvas);
        this._canvas.onResize.on(() =>
        {

        });
        this._time = new Time();
        this._keyboard = new Keyboard(this.canvas);
        this._keyboard.plugin();
        this._mouse = new Mouse(this.canvas);
        this._mouse.plugin();
    }

    public get canvas(): Canvas { return this._canvas; }
    public get renderer(): Renderer { return this._renderer; }
    public get time(): Time { return this._time; }
    public get keyboard(): Keyboard { return this._keyboard; }
    public get mouse(): Mouse { return this._mouse; }

    public run(): void
    {
        this._client = new Client(NetworkProtocol.W3CWebSocket);
        this._game = new GameClient(this._client);
        this._client.components.add(this._game);
        this._client.onConnection = async () =>
        {
            this.loop();
        };
        this._client.connect('localhost', 8080);
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
                console.log(id);
                this._context.drawCircle(
                    new Vector2(
                        obj.transform.position.x,
                        obj.transform.position.y
                    ),
                    1,
                    Color.black()
                );
            }
        }

        {
            const transform: Math.Transform = new Math.Transform;
            const speed: number = 2;
            let dirty: boolean = false;
            if (this._keyboard.isKeysDown(Keycode.W))
            {
                transform.position.y += speed * this.time.deltaTime;
                dirty = true;
            }
            else if (this._keyboard.isKeysDown(Keycode.S))
            {
                transform.position.y -= speed * this.time.deltaTime;
                dirty = true;
            }

            if (this._keyboard.isKeysDown(Keycode.A))
            {
                transform.position.x -= speed * this.time.deltaTime;
                dirty = true;
            }
            else if (this._keyboard.isKeysDown(Keycode.D))
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
}