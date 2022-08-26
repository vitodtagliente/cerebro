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
    /**
     * Retrieve a decorated text
     * @param text the text
     * @param color The color to use
     * @return The new decorated text
     */
    static decorate(text: string, color: string): string;
}
