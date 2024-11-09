"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const error_1 = require("./error");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProperties) {
        return this.prisma.user.create({
            data: {
                ...createProperties,
                password: bcrypt_1.default.hashSync(createProperties.password, 10),
            },
        });
    }
    async validateCredentials(credentialsProperties) {
        const user = await this.prisma.user.findFirst({
            where: {
                email: credentialsProperties.email,
            },
        });
        if (!user ||
            !bcrypt_1.default.compareSync(credentialsProperties.password, user.password)) {
            throw new error_1.WrongCredentialsError();
        }
        return user;
    }
    async getById(id) {
        const user = await this.prisma.user.findFirst({
            where: {
                id: id,
            },
        });
        if (!user) {
            return null;
        }
        return user;
    }
}
exports.UsersService = UsersService;
