"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
class Password {
    /**
    * Encrypt the password.
    * @param password The password to encrypt.
    * @returns A promise with two argument: the error string and hashed password.
    **/
    static hash(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt.hash(password, Password.saltRounds);
        });
    }
    /**
    * Check if the plain text password is equal to the hashed one.
    * @param password The password not encrypted.
    * @param saltRounds The already encrypted password.
    * @returns A promise with two argument: the error string and boolean results.
    **/
    static compare(plainPassword, hashedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt.compare(plainPassword, hashedPassword);
        });
    }
}
exports.default = Password;
/**
* salt rounds
**/
Password.saltRounds = 10;
//# sourceMappingURL=password.js.map