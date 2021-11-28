export default class Password {
    /**
    * salt rounds
    **/
    static saltRounds: number;
    /**
    * Encrypt the password.
    * @param password The password to encrypt.
    * @returns A promise with two argument: the error string and hashed password.
    **/
    static hash(password: string): Promise<string>;
    /**
    * Check if the plain text password is equal to the hashed one.
    * @param password The password not encrypted.
    * @param saltRounds The already encrypted password.
    * @returns A promise with two argument: the error string and boolean results.
    **/
    static compare(plainPassword: string, hashedPassword: string): Promise<boolean>;
}
