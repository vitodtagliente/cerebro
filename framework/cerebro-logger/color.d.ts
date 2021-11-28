export default class Color {
    static readonly Background: {
        Black: string;
        Red: string;
        Green: string;
        Yellow: string;
        Blue: string;
        Magenta: string;
        Cyan: string;
        White: string;
    };
    static readonly Foreground: {
        Black: string;
        Red: string;
        Green: string;
        Yellow: string;
        Blue: string;
        Magenta: string;
        Cyan: string;
        White: string;
    };
    static decorate(text: string, color: string): string;
}
