import Engine, { EngineSettings } from './engine';

window.onload = () =>
{
    const settings: EngineSettings = new EngineSettings;
    settings.host = '192.168.1.95';

    const engine: Engine = new Engine('game', settings);
    engine.run();
}