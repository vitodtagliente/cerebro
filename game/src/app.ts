import Engine from './engine';

window.onload = () =>
{
    const engine: Engine = new Engine('game');
    engine.run();
}