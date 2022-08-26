import * as bcrypt from 'bcrypt';

export default class Password
{
    /**
     * salt rounds
     */
    public static saltRounds: number = 10;

    /**
     * Encrypt the password.
     * @param password The password to encrypt.
     * @returns A promise with two argument: the error string and hashed password.
     */
    public static async hash(password: string): Promise<string>
    {
        return await bcrypt.hash(password, Password.saltRounds);
    }

    /**
     * Check if the plain text password is equal to the hashed one.
     * @param password The password not encrypted.
     * @param saltRounds The already encrypted password.
     * @returns A promise with two argument: the error string and boolean results.
     */
    public static async compare(plainPassword: string, hashedPassword: string): Promise<boolean>
    {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
}