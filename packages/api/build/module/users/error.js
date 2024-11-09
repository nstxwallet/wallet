"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrongCredentialsError = exports.UniqueKeyError = void 0;
class UniqueKeyError extends Error {
    constructor() {
        super("Unique key error");
        this.name = "UniqueKeyError";
    }
}
exports.UniqueKeyError = UniqueKeyError;
class WrongCredentialsError extends Error {
    constructor() {
        super("Wrong credentials");
        this.name = "WrongCredentialsError";
    }
}
exports.WrongCredentialsError = WrongCredentialsError;
