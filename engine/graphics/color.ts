import { random } from "../math/algo";

export default class Color
{
    public static readonly white: Color = new Color(1, 1, 1);
    public static readonly black: Color = new Color(0, 0, 0);
    public static readonly red: Color = new Color(1, 0, 0);
    public static readonly green: Color = new Color(0, 1, 0);
    public static readonly blue: Color = new Color(0, 0, 1);
    public static readonly cyan: Color = new Color(0, 1, 1);
    public static readonly yellow: Color = new Color(1, 1, 0);
    public static readonly magenta: Color = new Color(1, 0, 1);
    public static readonly transparent: Color = new Color(0, 0, 0, 0);

    public data: number[] = [4];

    public get r(): number { return this.data[0]; }
    public set r(value: number)
    {
        if (value >= 0 && value <= 1)
        {
            this.data[0] = value;
        }
        else 
        {
            this.data[0] = value / 255;
        }
    }
    public get g(): number { return this.data[1]; }
    public set g(value: number)
    {
        if (value >= 0 && value <= 1)
        {
            this.data[1] = value;
        }
        else 
        {
            this.data[1] = value / 255;
        }
    }
    public get b(): number { return this.data[2]; }
    public set b(value: number)
    {
        if (value >= 0 && value <= 1)
        {
            this.data[2] = value;
        }
        else 
        {
            this.data[2] = value / 255;
        }
    }
    public get a(): number { return this.data[3]; }
    public set a(value: number)
    {
        if (value >= 0 && value <= 1)
        {
            this.data[3] = value;
        }
        else 
        {
            this.data[3] = value / 255;
        }
    }

    public constructor(r?: number, g?: number, b?: number, a?: number)
    {
        this.data = [r, g, b, a ? a : 1];
    }

    public clone(): Color 
    {
        return new Color(this.r, this.g, this.b, this.a);
    }

    public copy(c: Color): void 
    {
        c.data = this.data.slice();
    }

    public set(r: number, g: number, b: number, a: number): void
    {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    public get rgba(): string
    {
        return `rgba(${this.r * 255},${this.g * 255},${this.b * 255},${this.a * 255})`;
    }

    public set rgba(value: string) 
    {
        const sep: string = value.indexOf(",") > -1 ? "," : " ";
        // Turn "rgba(r,g,b,a)" into [r,g,b,a]
        const data: string[] = value.substr(5).split(")")[0].split(sep);

        this.r = Number.parseInt(data[0]);
        this.g = Number.parseInt(data[1]);
        this.b = Number.parseInt(data[2]);
        this.a = Number.parseInt(data[2]);
    }

    public get hex(): string 
    {
        let r = Math.round(this.r * 255).toString(16);
        let g = Math.round(this.g * 255).toString(16);
        let b = Math.round(this.b * 255).toString(16);
        let a = Math.round(this.a * 255).toString(16);

        if (r.length == 1)
            r = "0" + r;
        if (g.length == 1)
            g = "0" + g;
        if (b.length == 1)
            b = "0" + b;
        if (a.length == 1)
            a = "0" + a;

        return `#${r}${g}${b}${a}`;
    }

    public static random(randomizeAlpha: boolean = false): Color
    {
        return new Color(random(0, 1), random(0, 1), random(0, 1),
            randomizeAlpha ? random(0, 1) : 1
        );
    }
}