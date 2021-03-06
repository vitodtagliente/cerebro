"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Color {
    /// Retrieve a decorated text
    /// @param text - The text
    /// @param color - The color to use
    /// @return - The new decorated text
    static decorate(text, color) {
        return `${color}${text}\x1b[0m`;
    }
}
exports.default = Color;
/// Background colors
Color.Background = {
    Black: "\x1b[40m",
    Red: "\x1b[41m",
    Green: "\x1b[42m",
    Yellow: "\x1b[43m",
    Blue: "\x1b[44m",
    Magenta: "\x1b[45m",
    Cyan: "\x1b[46m",
    White: "\x1b[47m"
};
/// Foreground colors
Color.Foreground = {
    Black: "\x1b[30m",
    Red: "\x1b[31m",
    Green: "\x1b[32m",
    Yellow: "\x1b[33m",
    Blue: "\x1b[34m",
    Magenta: "\x1b[35m",
    Cyan: "\x1b[36m",
    White: "\x1b[37m"
};
//# sourceMappingURL=color.js.map