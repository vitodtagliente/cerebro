import { Engine, EngineSettings } from "blackrose/application";

window.onload = () =>
{
    const settings: EngineSettings = new EngineSettings;
    settings.host = 'localhost';

    const engine: Engine = new Engine('game', settings);
    engine.run();
}