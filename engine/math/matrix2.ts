export default class Matrix2
{
    public static readonly zero: Matrix2 = new Matrix2;
    public static readonly identity: Matrix2 =
        new Matrix2(
            1, 0,
            0, 1
        );

    public readonly rows: number = 2;
    public readonly columns: number = 2;
    public readonly size: number = 2;

    public data: Float32Array;

    public get m00(): number { return this.data[0]; }
    public set m00(value: number) { this.data[0] = value; }
    public get m01(): number { return this.data[1]; }
    public set m01(value: number) { this.data[1] = value; }

    public get m10(): number { return this.data[2]; }
    public set m10(value: number) { this.data[2] = value; }
    public get m11(): number { return this.data[3]; }
    public set m11(value: number) { this.data[3] = value; }

    public constructor(
        a00: number = 0, a01: number = 0,
        a10: number = 0, a11: number = 0
    )
    {
        this.data = new Float32Array([a00, a01, a10, a11]);
    }

    public get(i: number, j: number): number
    {
        return this.data[i * this.rows + j];
    }

    public set(i: number, j: number, value: number): void 
    {
        this.data[i * this.rows + j] = value;
    }

    public clone(): Matrix2
    {
        const m: Matrix2 = new Matrix2;
        m.copy(this);
        return m;
    }

    public copy(m: Matrix2): void 
    {
        m.data = this.data.slice();
    }

    public determinant(): number
    {
        return this.m00 * this.m11 - this.m01 * this.m10;
    }

    public transpose(): Matrix2
    {
        return new Matrix2(
            this.m00, this.m10,
            this.m01, this.m11
        );
    }

    public inverse(): Matrix2
    {
        return new Matrix2(
            this.m11, -this.m10,
            -this.m01, this.m00
        ).div(this.determinant());
    }

    public add(m: Matrix2): Matrix2
    {
        return new Matrix2(
            this.m00 + m.m00, this.m01 + m.m01,
            this.m10 + m.m10, this.m11 + m.m11
        );
    }

    public sub(m: Matrix2): Matrix2
    {
        return new Matrix2(
            this.m00 - m.m00, this.m01 - m.m01,
            this.m10 - m.m10, this.m11 - m.m11
        );
    }

    public mul(scalar: number): Matrix2
    {
        return new Matrix2(
            this.m00 * scalar, this.m01 * scalar,
            this.m10 * scalar, this.m11 * scalar
        );
    }

    public mulMatrix(m: Matrix2): Matrix2
    {
        return new Matrix2(
            this.data[0] * m.data[0] + this.data[1] * m.data[2],
            this.data[0] * m.data[1] + this.data[1] * m.data[3],
            this.data[2] * m.data[0] + this.data[3] * m.data[2],
            this.data[2] * m.data[1] + this.data[3] * m.data[3],
        );
    }

    public static multiplyMatrices(matrices: Array<Matrix2>): Matrix2
    {
        if (matrices.length == 0) return Matrix2.zero.clone();

        const result: Matrix2 = new Matrix2;
        matrices[0].copy(result);
        for (let i = 1; i < matrices.length; ++i)
        {
            const m: Matrix2 = matrices[i];
            result.data[0] = result.data[0] * m.data[0] + result.data[1] * m.data[2];
            result.data[1] = result.data[0] * m.data[1] + result.data[1] * m.data[3];
            result.data[2] = result.data[2] * m.data[0] + result.data[3] * m.data[2];
            result.data[3] = result.data[2] * m.data[1] + result.data[3] * m.data[3];
        }
        return result;
    }

    public div(scalar: number): Matrix2
    {
        const factor: number = 1 / scalar;
        return new Matrix2(
            this.m00 * factor, this.m01 * factor,
            this.m10 * factor, this.m11 * factor
        );
    }
}